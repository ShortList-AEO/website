import type { Cta, Lang, Line } from "./types";
import { CLIENT, LEADER, SAMPLE_BANNER, SAMPLE_LABEL } from "./sample-report";

/*
 * All landing-page copy, in page order. Rules (see CLAUDE.md):
 * no invented numbers (cite sources.ts via sourceId), no guarantees, no acronyms
 * (AEO/GEO/LLMO/SEO agency), no hype words, no em dashes.
 */

export const primaryCta: Cta = { label: "Get your free AI audit", href: "#audit" };
export const sampleCta: Cta = { label: "See a sample report", href: "#sample-report" };

// 1. Hero ----------------------------------------------------------------------------

export const heroHeadlineOptions = [
  "AI is shortlisting products for your customers. You're not on the list.",
  "Your customer just asked AI what to buy. It didn't say your name.",
  "The shopper asked. AI answered. Your competitor got the sale.",
] as const;

export const hero = {
  /** Chosen: option 1. It is the idea behind the name ShortList, stated as the problem. */
  headline: heroHeadlineOptions[0],
  sub: [
    {
      text: "64% of Indian consumers already use AI somewhere in their purchase journey.",
      sourceId: "bcg-genai-purchase",
    },
    { text: "AI doesn't give them ten links. It gives a short list of brands." },
    { text: "We show you which brands, and why yours isn't one of them." },
  ] satisfies Line[],
  primaryCta,
  secondaryCta: sampleCta,
  chatLabel: "Illustration",
  /** The hero chat cycles through these. Fictional brands only; the shopper's brand never appears. */
  chat: [
    {
      lang: "en" as Lang,
      question: "best sunscreen for oily skin under ₹500",
      answer:
        "For oily skin under ₹500, the top picks are Vedra Matte Gel SPF 50, GlowLab Aqua Fluid SPF 50 and Saffra Skin Daily Shield. Vedra is the best overall: light, no white cast, around ₹399.",
    },
    {
      lang: "hinglish" as Lang,
      question: "oily skin ke liye best face wash kaunsa hai?",
      answer:
        "Oily skin ke liye GlowLab Salicylic Face Wash best rahega. Vedra Oil Control Gel aur Saffra Skin Neem Wash bhi achhe options hain.",
    },
    {
      lang: "hi" as Lang,
      question: "तैलीय त्वचा के लिए सबसे अच्छा फेस वॉश कौन सा है?",
      answer:
        "तैलीय त्वचा के लिए ग्लोलैब सैलिसिलिक फेस वॉश सबसे अच्छा है। वेद्रा ऑयल कंट्रोल जेल और सैफ्रा स्किन नीम वॉश भी अच्छे विकल्प हैं।",
    },
  ],
};

// 2. The shift -----------------------------------------------------------------------

export const shift = {
  heading: "Search gave ten links. AI gives one answer.",
  illustrationLabel: "Illustration: a search results page, then an AI answer",
  line: "There's no page two in an AI answer.",
  support: {
    text: "And India is asking. ChatGPT alone has 100 million users here every week, its second-largest market after the US.",
    sourceId: "chatgpt-india-weekly",
  } satisfies Line,
};

// 3. The invisible loss --------------------------------------------------------------

export const invisibleLoss = {
  heading: "You won't see this loss in any dashboard.",
  intro:
    "No impressions. No clicks. No report that says lost to a competitor. The sale just goes somewhere else.",
  beats: [
    "It doesn't show up in Google Analytics.",
    "It doesn't show up in your Amazon reports.",
    "It shows up as a month where growth was slower and nobody knows why.",
  ],
};

// 4. It's worse in Hindi -------------------------------------------------------------

export const hindi = {
  heading: "It's worse in Hindi.",
  label: SAMPLE_LABEL,
  summary: `In our sample, ${CLIENT}'s share of voice falls from 12% in English to 2% in Hindi. ${LEADER} goes the other way, up to 38%.`,
  point: "India shops in three languages. Your brand might only exist in one of them for AI.",
  metricNote: "Share of voice: of every brand mention in AI answers, the share that is this brand.",
};

// 5. Sample report -------------------------------------------------------------------

export const sampleReport = {
  id: "sample-report",
  heading: "This is what your audit looks like.",
  banner: SAMPLE_BANNER,
  intro:
    "One page. Your brand against your top three competitors, built from 320 AI answers to 40 buyer questions. Every number comes with a range, because AI answers change from one ask to the next.",
  sov: {
    title: "Share of voice",
    definition: "Of every brand mention in AI answers, the share that is this brand.",
    rangeNote: "Lines show the 95% range: where the number could sit if we asked again.",
  },
  namedPicked: {
    title: "Named vs. picked",
    namedDefinition: "Named rate: the share of answers that mention the brand at all.",
    pickedDefinition: "Pick rate: the share of answers where AI recommends the brand as its top choice.",
    takeaway:
      "AI knows the name but rarely chooses it. Share of voice (9%) counts mentions. Pick rate (4%) counts wins. They are different numbers on purpose.",
  },
  lost: {
    title: "Questions you're losing",
    definition: "Each question was asked 8 times. The count shows how often the competitor was the pick.",
  },
  gaps: {
    title: "Where AI looks when you lose",
    definition: "Websites AI cited in the 96 answers where a competitor was picked and you weren't.",
  },
};

// 6. How it works --------------------------------------------------------------------

export const howItWorks = {
  heading: "How it works",
  steps: [
    {
      title: "We ask AI what your customers ask.",
      body: "40 real buyer questions in English, Hinglish and Hindi. Each one asked 8 times, because AI answers change.",
    },
    {
      title: "We show you where you lose and who wins.",
      body: "Which questions, which competitor gets picked, and which websites AI read to decide.",
    },
    {
      title: "We fix it and re-measure every month.",
      body: 'Reviews where AI reads, pages that answer the question, Hindi content. Each month we ask the same questions again. A change is marked "real" only if it is bigger than the normal ups and downs. Otherwise we tell you it\'s noise.',
    },
  ],
};

// 7. What we fix ---------------------------------------------------------------------

export const whatWeFix = {
  heading: "What we fix first",
  cards: [
    {
      title: "Get reviewed where AI reads",
      body: "When you lose, AI is usually quoting Nykaa reviews, Reddit threads and YouTube. We get your products into those conversations.",
    },
    {
      title: "Win your highest-value questions",
      body: "Clear pages that answer the exact question a buyer asks: price, skin type, SPF, ingredients. Things AI can quote.",
    },
    {
      title: "Show up in Hindi",
      body: "Hindi product descriptions and answers, so AI has something to say about you when the question isn't in English.",
    },
  ],
};

// 8. Our promise ---------------------------------------------------------------------

export const promise = {
  heading: "The honest part",
  lines: [
    "We won't promise you #1 on ChatGPT. Nobody can. Anyone who does is lying.",
    "We measure with the method in the report, show you the ranges, and tell you when a change is real and when it's noise.",
    "Free audit first. If the numbers don't worry you, don't hire us.",
  ],
};

// 9. Offer ---------------------------------------------------------------------------

export const offer = {
  heading: "Start with a free audit",
  audit: {
    title: "Free AI audit",
    body: "Your brand against your top 3 competitors, across 40 buyer questions in English, Hinglish and Hindi. Delivered as a one-page report.",
  },
  monthly: {
    title: "Monthly plans after your audit",
    body: "We fix what the audit finds and re-measure every month, so you can see whether it moved.",
  },
  cta: primaryCta,
};

// 11. Final call to action -----------------------------------------------------------

export const finalCta = {
  id: "audit",
  heading: "Find out what AI tells your customers. Free.",
  body: "Tell us your brand and category. We'll ask AI your customers' questions and send you the one-page report.",
};
