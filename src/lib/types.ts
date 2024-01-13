export interface SearchResult {
  success: true;
  brand: string;
  results: Record<string, string>;
}

export interface SearchError {
  success: false;
  brand: string;
  error: string;
}

export enum SearchStatus {
  TAKEN = '❌',
  AVAILABLE = '✅',
}

export type SearchResponse = SearchResult | SearchError;
