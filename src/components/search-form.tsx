'use client';
import {Spinner} from "@/components/spinner";
import {MagnifyingGlass} from "@/components/magnifying-glass";
import {useCallback, useState} from "react";
import {useSearchHistory} from "@/providers/SearchHistoryProvider";
import {search} from "@/lib/search";

export const SearchForm = () => {
  const [error, setError] = useState<string>('');
  const {addSearchResult} = useSearchHistory();
  const [brand, setBrand] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(async () => {
    setSubmitting(true);
    const formdata = new FormData();
    formdata.set('brand', brand);
    const response = await search(formdata);
    if (!response.success) {
      console.error(response.error);
      setError(response.error);
      setSubmitting(false);
      return;
    }

    setError('');
    addSearchResult(response);
    setSubmitting(false);
  }, [addSearchResult, brand]);

  return (
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
  );
}