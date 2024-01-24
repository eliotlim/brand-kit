'use client';
import {useMemo} from "react";
import {useSearchHistory} from "@/providers/SearchHistoryProvider";

export const ResultsTable = () => {
  const {searchResults} = useSearchHistory();

  const locations = useMemo<string[]>(() => {
    const locationSet = new Set<string>();
    searchResults.forEach(result => Object.keys(result.results).forEach(location => locationSet.add(location)));
    return Array.from(locationSet).sort();
  }, [searchResults]);

  return (
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
      {searchResults ? searchResults.toReversed().map(entry => (<>
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
      </>)) : "No results yet"}
      </tbody>
    </table>
  );
}