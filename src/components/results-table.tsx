'use client';
import {useMemo} from "react";
import {useSearchHistory} from "@/providers/SearchHistoryProvider";

export const ResultsTable = () => {
  const {searchResults, clearSearchResults} = useSearchHistory();

  const locations = useMemo<string[]>(() => {
    const locationSet = new Set<string>();
    searchResults.forEach(result => Object.keys(result.results).forEach(location => locationSet.add(location)));
    return Array.from(locationSet).sort();
  }, [searchResults]);

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-x-6 text-gray-900">
      {searchResults && searchResults.length > 0 &&
        <table className="border-separate border-spacing-x-10 border-spacing-y-2">
          <thead>
          <tr>
            <th>
              <p className="text-gray-900">Results</p>
            </th>
            {locations.map(location => (<>
              <th>
                <p className="text-gray-900">
                  {location}
                </p>
              </th>
            </>))}
          </tr>
          </thead>
          <tbody>
          {searchResults ? searchResults.map(entry => (<>
            <tr>
              <td className="text-gray-900">
                {entry.brand}
              </td>
              {
                locations.map(location => (<>
                  <td className="text-gray-900">
                    {entry.results[location]}
                  </td>
                </>))
              }
            </tr>
          </>)).reverse() : <></>}
          </tbody>
        </table>
      }
      {searchResults.length === 0 ? "No results yet" :
        <button
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            clearSearchResults();
          }}
        >
          Clear Results
        </button>
      }
    </div>
  );
}