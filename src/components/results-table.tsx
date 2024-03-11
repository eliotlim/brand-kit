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
    <div className="mt-10 flex flex-col items-center justify-center gap-x-6 text-gray-900 dark:text-gray-100">
      <div className="w-full overflow-x-scroll">
      {searchResults && searchResults.length > 0 &&
        <table className="border-separate border-spacing-x-6 border-spacing-y-2 overflow-x-scroll w-full table-auto">
          <thead>
          <tr>
            <th className="sticky left-0 h-fit bg-gray-50 dark:bg-gray-800 text-left">
              <p className="text-gray-900 dark:text-gray-100">Results</p>
            </th>
            {locations.map(location => (<>
              <th>
                <p className="text-gray-900 dark:text-gray-100">
                  {location}
                </p>
              </th>
            </>))}
          </tr>
          </thead>
          <tbody>
          {searchResults ? searchResults.map(entry => (<>
            <tr>
              <td className="text-gray-900 dark:text-gray-100 sticky left-0 h-fit bg-gray-50 dark:bg-gray-800 text-left">
                {entry.brand}
              </td>
              {
                locations.map(location => (<>
                  <td className="text-gray-900 dark:text-gray-100">
                    {entry.results[location]}
                  </td>
                </>))
              }
            </tr>
          </>)).reverse() : <></>}
          </tbody>
        </table>
      }
      </div>
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