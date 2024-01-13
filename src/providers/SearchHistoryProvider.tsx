"use client";
import {createContext, ReactNode, useCallback, useContext, useState} from "react";
import {SearchResult} from "@/lib/types";

export type SearchHistoryContext = {
  searchResults: SearchResult[];
  addSearchResult: (searchResult: SearchResult) => void;
  clearSearchResults: () => void;
};

export const SearchHistoryContext = createContext<SearchHistoryContext>({
  searchResults: [],
  addSearchResult: () => {},
  clearSearchResults: () => {},
});

export const useSearchHistory = () => {
  return useContext(SearchHistoryContext);
}

export const SearchHistoryProvider = (props: {} & {children: ReactNode}) => {
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);

  const addSearchResult = useCallback((searchResult: SearchResult) => {
    setSearchHistory((prev) => {
      return [...prev, searchResult];
    });
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchHistory([]);
  }, []);

  return (
    <SearchHistoryContext.Provider value={{
      searchResults: searchHistory,
      addSearchResult,
      clearSearchResults,
    }}>
      {props.children}
    </SearchHistoryContext.Provider>
  );
};
