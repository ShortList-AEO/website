import type { Source, SourceId } from "./types";

/**
 * Every real-world number on the site lives here, with where it came from.
 * Rule: no number on the page without an entry here. If a claim has no source,
 * the copy uses a `[STAT NEEDED: ...]` placeholder instead (see STAT_NEEDED below).
 * Verified against the publisher's own page on 2026-10-18.
 */
export const sources: Record<SourceId, Source> = {
  "bcg-genai-purchase": {
    id: "bcg-genai-purchase",
    claim: "64% of Indian consumers say they use AI somewhere in their purchase journey.",
    figure: "64%",
    sourceName: "Boston Consulting Group",
    url: "https://www.bcg.com/news/6january2026-india-global-leader-genai-for-shopping",
    date: "2026-01-06",
    note:
      'BCG wording: "64% of consumers report using GenAI in their purchase journeys." Self-reported; from BCG\'s consumer survey across nine countries.',
  },
  "chatgpt-india-weekly": {
    id: "chatgpt-india-weekly",
    claim: "100 million people in India use ChatGPT every week, its second-largest market after the US.",
    figure: "100 million weekly users",
    sourceName: "Sam Altman (OpenAI), reported by TechCrunch",
    url: "https://www.techcrunch.com/2026/02/15/india-has-100m-weekly-active-chatgpt-users-sam-altman-says/",
    date: "2026-02-15",
    note: "Company figure stated by OpenAI's CEO; covers free and paid users; all uses, not only shopping.",
  },
  "bain-chatgpt-mau": {
    id: "bain-chatgpt-mau",
    claim: "ChatGPT has more than 160 million monthly users in India, up about 4.5x in 2025.",
    figure: "160 million+ monthly users",
    sourceName: "Bain & Company, How India Shops Online 2026",
    url: "https://www.bain.com/insights/how-india-shops-online-2026/",
    date: "2026-04-08",
    note: "Monthly active users, all uses. Bain notes end-to-end shopping inside AI is still rare; research and comparison are the early use.",
  },
  "capgemini-genai-recs": {
    id: "capgemini-genai-recs",
    claim: "58% of consumers prefer product recommendations from AI tools over search engines.",
    figure: "58%",
    sourceName: "Capgemini Research Institute, What matters to today's consumer 2025",
    url: "https://www.capgemini.com/gb-en/insights/research-library/what-matters-to-todays-consumer-2025",
    date: "2025-01",
    note:
      "Global survey of 12,000 consumers in 12 countries including India; not India-only. Publication month inferred from the report files (January 2025).",
  },
};

/** Claims we'd like to make but can't source yet. Never replace with a guessed number. */
export const STAT_NEEDED = [
  "[STAT NEEDED: how many brands a typical AI answer names for Indian beauty questions] (we can measure this ourselves from our first real runs)",
  "[STAT NEEDED: share of Indian beauty shoppers who ask AI before visiting Nykaa or Amazon]",
] as const;
