"use client";
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {SearchResult} from "@/lib/types";

export const SEARCH_HISTORY_LOCAL_STORAGE_KEY = 'searchHistory';

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

  // Load searchHistory from local storage when the component mounts / app starts
  useEffect(() => {
    const data = localStorage.getItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY);
    try {
      if (data) {
        const parsedData = JSON.parse(data);
        setSearchHistory(parsedData);
      }
    } catch (e) {
      setSearchHistory([]);
    }
  }, [setSearchHistory]);

  const addSearchResult = useCallback((searchResult: SearchResult) => {
    setSearchHistory((prev) => {
      localStorage.setItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY, JSON.stringify([...prev, searchResult]));
      return [...prev, searchResult];
    });
  }, []);

  const clearSearchResults = useCallback(() => {
    localStorage.removeItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY);
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
