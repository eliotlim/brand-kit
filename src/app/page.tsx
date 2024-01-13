import BrandSearch from "@/components/brandsearch";
import {SearchResponse} from "@/lib/types";
import {search} from "@/lib/search";
import {SearchHistoryProvider} from "@/providers/SearchHistoryProvider";

export default function Home() {
  async function performSearch(data: FormData): Promise<SearchResponse> {
    'use server';
    return search(data);
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <SearchHistoryProvider>
        <BrandSearch search={performSearch}/>
      </SearchHistoryProvider>
    </main>
  )
}
