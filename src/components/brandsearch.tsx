import {ResultsTable} from "@/components/results-table";
import {SearchForm} from "@/components/search-form";

export default function BrandSearch() {
  return (
    <div className="flex flex-col m-auto text-center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Brand Kit</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Search everywhere* for your next brand</p>
      </div>
      <SearchForm/>
      <div className="mt-10 flex items-center justify-center gap-x-6 text-gray-900">
        <ResultsTable/>
      </div>
    </div>
  )
}
