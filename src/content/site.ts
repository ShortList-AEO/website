import { primaryCta } from "./home";

/** Site-wide copy: metadata, nav, footer, and the "How we measure" page. */
export const site = {
  name: "ShortList",
  url: "https://[DOMAIN NEEDED]",
  meta: {
    title: "ShortList: see what AI tells your customers",
    description:
      "When shoppers ask AI what to buy, it names a few brands. ShortList shows Indian D2C brands where they lose to competitors in AI answers, in English, Hinglish and Hindi, and fixes it.",
  },
  nav: {
    links: [
      { label: "Sample report", href: "#sample-report" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: primaryCta,
    ctaShort: "Free audit",
    themeToggle: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
  },
  footer: {
    contact: "[CONTACT EMAIL NEEDED]",
    methodLink: { label: "How we measure", href: "/how-we-measure" },
    privacy: "We don't use tracking cookies. Details you send us are used only to prepare your audit.",
  },
};

/** The /how-we-measure page. Plain-language version of the product repo's docs/method.md. */
export const method = {
  title: "How we measure",
  sections: [
    {
      heading: "The questions",
      body: "We agree a fixed set of real buyer questions with you, in English, Hinglish and Hindi: best-of lists, comparisons, questions about your brand, problem-led questions and price questions. Each question has a weight, so a buying question counts for more than a research question. The set is frozen. We never change questions silently, and if a comparison spans two versions, the report says so.",
    },
    {
      heading: "Asking AI",
      body: "We ask each question 8 times, because AI answers vary. We use the official API from OpenAI, the company behind ChatGPT, with web search on and the location set to India. We never automate or scrape the consumer apps. A person checks a sample in the real app so our numbers match what shoppers see. Every answer is stored in full, so any number can be traced back to the answers it came from.",
    },
    {
      heading: "Reading the answers",
      body: "For each answer and each brand, we record whether the brand is named, whether AI picks it as the top recommendation, and the sentence that shows it. Some brand names are also everyday words. When a mention is unclear, a person reviews it. We don't guess.",
    },
    {
      heading: "The numbers",
      body: "Share of voice is your share of all brand mentions. Named rate is how often you're mentioned at all. Pick rate is how often you're the top recommendation. Every number comes with a 95% range, worked out by re-sampling the questions and answers thousands of times.",
    },
    {
      heading: "Real or noise",
      body: 'Each month we ask the same questions again. A change is marked "real" only if its range doesn\'t include zero. Otherwise it is marked "within noise", even if it looks like progress.',
    },
  ],
};
