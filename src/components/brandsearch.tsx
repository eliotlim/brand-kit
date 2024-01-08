'use client';
import {useCallback, useState} from "react";

interface BrandSearchProps{
  search: (data: FormData) => Promise<{result: Record<string, string>} | {error: Record<string, string>}>;
}
export default function BrandSearch(props: BrandSearchProps) {

  const [result, setResult] = useState<Record<string, string>>({});

  const onSubmit = useCallback(async (event: FormData) => {
    const response = await props.search(event);
    if ('error' in response) {
      console.error(response.error);
      setResult(response.error);
      return;
    }

    setResult(response.result);
  }, [props]);

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
          >
          </input>
          <input
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            value={"Search"}
          >
          </input>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6 text-gray-900">
          <ul>
            {result ? Object.keys(result).map(entry => <><p className="text-gray-900">{entry}: {result[entry]}</p></>) : "No results yet"}
          </ul>
        </div>
      </form>
    </div>
  )
}
