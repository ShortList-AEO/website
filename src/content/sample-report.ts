import type { Lang } from "./types";

/**
 * The sample report: fictional brands, made-up numbers. One source of truth for every
 * sample figure on the site (hero chat, Hindi section, report story), so they never disagree.
 * Matches the PDF sample report. Anywhere these appear, show SAMPLE_LABEL.
 */
export const SAMPLE_LABEL = "Sample report: fictional brands";
export const SAMPLE_BANNER =
  "Sample report: fictional brands, made-up numbers. Yours is built from real AI answers about your category.";

export const CLIENT = "Nila Naturals";
export const LEADER = "Vedra";

export interface Range {
  value: number;
  low: number;
  high: number;
}

/** Share of voice: of every brand mention in AI answers, the share that is this brand. */
export const shareOfVoice: { brand: string; isYou: boolean; sov: Range }[] = [
  { brand: "Vedra", isYou: false, sov: { value: 31, low: 25, high: 37 } },
  { brand: "GlowLab", isYou: false, sov: { value: 22, low: 17, high: 28 } },
  { brand: "Saffra Skin", isYou: false, sov: { value: 14, low: 10, high: 19 } },
  { brand: "Nila Naturals", isYou: true, sov: { value: 9, low: 6, high: 13 } },
];

/** Named rate: share of answers that mention the brand. Pick rate: share where AI picks it. */
export const namedVsPicked = {
  you: { named: { value: 21, low: 16, high: 27 }, picked: { value: 4, low: 2, high: 7 } },
  leader: { named: { value: 64, low: 56, high: 71 }, picked: { value: 27, low: 21, high: 34 } },
};

/** Share of voice by the language the question was asked in. */
export const byLanguage: { lang: Lang; label: string; questions: number; you: Range; leader: Range }[] = [
  { lang: "en", label: "English", questions: 20, you: { value: 12, low: 8, high: 17 }, leader: { value: 29, low: 22, high: 36 } },
  { lang: "hinglish", label: "Hinglish", questions: 12, you: { value: 6, low: 3, high: 10 }, leader: { value: 31, low: 23, high: 40 } },
  { lang: "hi", label: "Hindi", questions: 8, you: { value: 2, low: 0, high: 5 }, leader: { value: 38, low: 27, high: 49 } },
];

export const lostQuestions: { lang: Lang; langLabel: string; question: string; winner: string; quote: string; won: number; of: number }[] = [
  {
    lang: "en",
    langLabel: "English",
    question: "Best sunscreen for oily skin under ₹500",
    winner: "Vedra",
    quote: "For oily skin on a budget, Vedra Matte Gel SPF 50 is the top pick: lightweight, no white cast, around ₹399.",
    won: 8,
    of: 8,
  },
  {
    lang: "hinglish",
    langLabel: "Hinglish",
    question: "oily skin ke liye best face wash kaunsa hai?",
    winner: "GlowLab",
    quote: "GlowLab Salicylic Face Wash best rahega, oily skin aur acne dono ke liye.",
    won: 7,
    of: 8,
  },
  {
    lang: "hi",
    langLabel: "Hindi",
    question: "चेहरे के दाग-धब्बे हटाने के लिए कौन सा सीरम लें?",
    winner: "Saffra Skin",
    quote: "दाग-धब्बों के लिए सबसे अच्छा विकल्प सैफ्रा स्किन का विटामिन C सीरम है।",
    won: 6,
    of: 8,
  },
];

/** Websites cited in the answers where a competitor was picked and you weren't. */
export const sourceGaps = {
  lostAnswers: 96,
  sites: [
    { domain: "nykaa.com", answers: 41 },
    { domain: "reddit.com", answers: 29 },
    { domain: "youtube.com", answers: 22 },
    { domain: "femina.in", answers: 14 },
    { domain: "amazon.in", answers: 12 },
  ],
};

export const runFacts = {
  questions: 40,
  repeats: 8,
  answers: 320,
  languages: ["English", "Hinglish", "Hindi"],
};
