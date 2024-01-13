import z from "zod";
import {SearchResponse, SearchStatus} from "@/lib/types";

export const search = async (data: FormData): Promise<SearchResponse> => {
  const brandInput = z.string().min(1).max(100);
  const parseBrand = brandInput.safeParse(data.get('brand'));
  if (!parseBrand.success) {
    return {
      success: false,
      brand: data.get('brand')?.toString() ?? '',
      error: parseBrand.error.format()._errors.toString(),
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
    success: true,
    brand: parseBrand.data,
    results: {
      github: github ? SearchStatus.AVAILABLE : SearchStatus.TAKEN,
      npm: npm ? SearchStatus.AVAILABLE : SearchStatus.TAKEN,
      pypi: pypi ? SearchStatus.AVAILABLE : SearchStatus.TAKEN,
      crates: crates ? SearchStatus.AVAILABLE : SearchStatus.TAKEN,
    },
  };
};
