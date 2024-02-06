import BrandSearch from "@/components/brandsearch";
import {SearchHistoryProvider} from "@/providers/SearchHistoryProvider";

export default function Home() {

  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-slate-800 px-6 py-24 sm:py-32 lg:px-8">
      <SearchHistoryProvider>
        <BrandSearch/>
      </SearchHistoryProvider>
    </main>
  )
}
