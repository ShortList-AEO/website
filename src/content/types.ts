/** Shared types for page copy. Components render these; they never hard-code words. */

export type Lang = "en" | "hinglish" | "hi";

/** A sentence that may cite a source from sources.ts (rendered as a small footnote link). */
export interface Line {
  text: string;
  sourceId?: SourceId;
}

export type SourceId = "bcg-genai-purchase" | "chatgpt-india-weekly" | "bain-chatgpt-mau" | "capgemini-genai-recs";

export interface Source {
  id: SourceId;
  /** The claim exactly as the page may state it. */
  claim: string;
  /** The number as published. */
  figure: string;
  sourceName: string;
  url: string;
  /** Publication date (YYYY-MM-DD) as stated by the source. */
  date: string;
  /** Scope limits a reader should know (sample, geography, wording). */
  note: string;
}

export interface Cta {
  label: string;
  href: string;
}
