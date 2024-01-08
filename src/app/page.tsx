import BrandSearch from "@/components/brandsearch";
import z from "zod";

export default function Home() {
  async function search(data: FormData) : Promise<{result: Record<string, string>} | {error: Record<string, string>}> {
    'use server';

    const brandInput = z.string().min(1).max(100);
    const parseBrand = brandInput.safeParse(data.get('brand'));
    if (!parseBrand.success) {
      return {
        error: {
          message: 'Invalid brand name',
          zod: parseBrand.error.toString(),
        },
      }
    }

    console.log(`Querying for: ${parseBrand.data}...`);

    const fetchConfig = {headers: {'User-Agent': 'brand-kit-search'}};

    // check github
    const github = (await fetch(`https://www.github.com/${parseBrand.data}`, fetchConfig)).status === 404;

    // check npm
    const npm = (await fetch(`https://www.npmjs.com/package/${parseBrand.data}`, fetchConfig)).status === 404;

    // check pypi
    const pypi = (await fetch(`https://pypi.org/project/${parseBrand.data}`, fetchConfig)).status === 404;

    // check crates
    const crates = (await fetch(`https://crates.io/api/v1/crates/${parseBrand.data}`, fetchConfig)).status === 404;

    console.log(`Github: ${github}, NPM: ${npm}, PyPI: ${pypi}, Crates: ${crates}`)

    return {
      result: {
        github: github ? '✅ Available' : '❌ Taken',
        npm: npm ? '✅ Available' : '❌ Taken',
        pypi: pypi ? '✅ Available' : '❌ Taken',
        crates: crates ? '✅ Available' : '❌ Taken',
      },
    };
  }

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <BrandSearch search={search}/>
    </main>
  )
}
