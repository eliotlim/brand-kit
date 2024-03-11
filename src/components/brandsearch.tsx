import {ResultsTable} from "@/components/results-table";
import {SearchForm} from "@/components/search-form";

export default function BrandSearch() {
  return (
    <div className="flex flex-col m-auto text-center w-full">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">Brand Kit</h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Search everywhere* for your next brand</p>
      </div>
      <SearchForm/>
      <ResultsTable/>
    </div>
  )
}
