"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";
import type { Lang } from "@/content/types";
import { MQ } from "@/lib/gsap";

const LANG_LABEL: Record<Lang, string> = { en: "English", hinglish: "Hinglish", hi: "Hindi" };
const BRANDS = ["Vedra", "GlowLab", "Saffra Skin", "वेद्रा", "ग्लोलैब", "सैफ्रा स्किन"];

type Phase = "typing" | "thinking" | "streaming" | "done";

/** Wrap fictional competitor names in the answer so they read as named brands. */
function highlight(text: string) {
  const pattern = new RegExp(`(${BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    BRANDS.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Hero illustration: a shopper's question types itself, an answer streams in naming fictional
 * competitors, and the shopper's brand is missing. Cycles English, Hinglish, Hindi.
 * Reduced motion: shows each conversation complete, switched with the tabs.
 */
export function HeroChat() {
  const chats = hero.chat;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("done");
  const [qChars, setQChars] = useState(chats[0]!.question.length);
  const [aWords, setAWords] = useState(chats[0]!.answer.split(" ").length);
  const [auto, setAuto] = useState(false);
  const [pending, setPending] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  const chat = chats[index]!;
  const words = chat.answer.split(" ");

  // Server render shows the question with the answer held back (CSS) so it can stream in.
  // Reduced motion: reveal everything and don't autoplay.
  useEffect(() => {
    const reduced = window.matchMedia(MQ.reduced).matches;
    const io = new IntersectionObserver(([e]) => (visible.current = !!e?.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);
    const start = window.setTimeout(() => {
      if (!reduced) {
        setAWords(0);
        setPhase("thinking");
        setAuto(true);
      }
      setPending(false);
    }, 0);
    return () => {
      io.disconnect();
      window.clearTimeout(start);
    };
  }, []);

  useEffect(() => {
    if (!auto) return;
    let t: number;
    const wait = (fn: () => void, ms: number) => {
      t = window.setTimeout(() => {
        if (!visible.current || document.hidden) wait(fn, 400);
        else fn();
      }, ms);
    };
    if (phase === "typing") {
      if (qChars < chat.question.length) {
        const ch = chat.question[qChars];
        wait(() => setQChars((n) => n + 1), ch === " " ? rand(60, 140) : rand(28, 75));
      } else wait(() => setPhase("thinking"), 380);
    } else if (phase === "thinking") {
      wait(() => setPhase("streaming"), rand(700, 1000));
    } else if (phase === "streaming") {
      if (aWords < words.length) wait(() => setAWords((n) => n + 1), rand(35, 95));
      else wait(() => setPhase("done"), 200);
    } else {
      wait(() => {
        setIndex((i) => (i + 1) % chats.length);
        setQChars(0);
        setAWords(0);
        setPhase("typing");
      }, 4200);
    }
    return () => window.clearTimeout(t);
  }, [auto, phase, qChars, aWords, chat.question, words.length, chats.length]);

  const select = useCallback((i: number) => {
    setAuto(false);
    setIndex(i);
    setQChars(chats[i]!.question.length);
    setAWords(chats[i]!.answer.split(" ").length);
    setPhase("done");
  }, [chats]);

  const question = chat.question.slice(0, qChars);
  const answer = words.slice(0, aWords).join(" ");
  const showAnswer = phase === "streaming" || phase === "done";
  const lang = chat.lang === "hi" ? "hi" : "en-IN";

  return (
    <div ref={rootRef} className="relative" data-pending={pending ? "true" : "false"}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="t-label">{hero.chatLabel}</p>
        <div role="tablist" aria-label="Question language" className="flex gap-1">
          {chats.map((c, i) => (
            <button
              key={c.lang}
              role="tab"
              type="button"
              aria-selected={i === index}
              onClick={() => select(i)}
              className={`t-label rounded-[3px] px-2 py-1 ${i === index ? "bg-ink !text-bg" : "hover:text-ink"}`}
            >
              {LANG_LABEL[c.lang]}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-[6px] border border-rule bg-surface shadow-[var(--shadow)]"
        aria-hidden
      >
        <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5">
          <span className="size-2 rounded-full bg-rival" />
          <span className="t-label">AI assistant</span>
        </div>

        <div className="flex min-h-[318px] flex-col gap-4 p-4 sm:min-h-[296px] sm:p-5">
          <div className="ml-auto max-w-[88%] rounded-[14px] rounded-br-[4px] bg-rival-soft px-4 py-2.5">
            <p lang={lang} className="text-[1rem] leading-snug">
              {question}
              {phase === "typing" ? (
                <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-ink [animation:caret_1s_steps(1)_infinite]" />
              ) : null}
            </p>
          </div>

          <div className="max-w-[94%]">
            {phase === "thinking" ? (
              <p className="t-label flex gap-1" aria-hidden>
                <span className="[animation:caret_1.2s_steps(1)_infinite]">Searching the web</span>
              </p>
            ) : null}
            {showAnswer ? (
              <p data-answer lang={lang} className="text-[0.98rem] leading-relaxed text-muted">
                {highlight(answer)}
              </p>
            ) : null}
          </div>

          <div
            data-answer
            className={`mt-auto flex items-center gap-2.5 border-t border-dashed border-rule pt-3 transition-opacity duration-500 ${
              phase === "done" ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="size-2.5 rounded-full border-[1.5px] border-you" />
            <p className="text-[0.92rem] font-medium text-you">Your brand isn&apos;t in this answer.</p>
          </div>
        </div>
      </div>

      <p className="sr-only">
        Illustration with fictional brands. A shopper asks AI: “{chat.question}”. The answer recommends{" "}
        Vedra, GlowLab and Saffra Skin. The shopper&apos;s own brand is not mentioned.
      </p>
    </div>
  );
}
