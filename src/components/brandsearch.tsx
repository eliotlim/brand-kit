'use client';
import {useCallback, useMemo, useState} from "react";
import {Spinner} from "./spinner";
import {MagnifyingGlass} from "@/components/magnifying-glass";
import {SearchResponse, SearchResult} from "@/app/page";

interface BrandSearchProps {
  search: (data: FormData) => Promise<SearchResponse>;
}

export default function BrandSearch(props: BrandSearchProps) {

  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [brand, setBrand] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(async () => {
    setSubmitting(true);
    const formdata = new FormData();
    formdata.set('brand', brand);
    const response = await props.search(formdata);
    if (!response.success) {
      console.error(response.error);
      setError(response.error);
      setSubmitting(false);
      return;
    }

    setError('');
    setResults([
      response,
      ...results,
    ]);
    setSubmitting(false);
  }, [brand, props, results]);

  const locations = useMemo<string[]>(() => {
    const locationSet = new Set<string>();
    results.forEach(result => Object.keys(result.results).forEach(location => locationSet.add(location)));
    return Array.from(locationSet);
  }, [results]);

  return (
    <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Brand Kit</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Search everywhere* for your next brand</p>
      <form action={onSubmit}>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <input
            className="rounded-md bg-gray-50 px-3.5 py-2.5 text-sm font-normal text-black shadow-sm hover:bg-gray-100 outline outline-2 outline-offset-2 outline-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="text"
            name="brand"
            placeholder={"Search for a brand"}
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          >
          </input>
          <button
            type="submit"
            disabled={submitting}
            className="flex flex-row gap-1 w-28 h-12 items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-300 hover:disabled:bg-indigo-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            value={submitting ? "Searching..." : "Search"}
            onClick={onSubmit}
          >
            {submitting ?
              <Spinner/> : <MagnifyingGlass/>
            }
            Search
          </button>
        </div>
        <div className="my-2 flex items-center justify-center gap-x-6 text-gray-900">
          <p className="text-sm italic text-gray-600">
            {error || ' '}
          </p>
        </div>
      </form>
      <div className="mt-10 flex items-center justify-center gap-x-6 text-gray-900 h-40">
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
          {results ? results.map(entry => (<>
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
      </div>
    </div>
  )
}
