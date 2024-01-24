'use server';
import z from "zod";
import {SearchResponse, SearchStatus} from "@/lib/types";

interface Checker {
  namespace: string;
  check(brand: string): Promise<boolean>;
}

const fetchConfig = {headers: {'User-Agent': 'brand-kit-search'}};

class GithubChecker implements Checker {
  namespace = 'github';
  async check(brand: string): Promise<boolean> {
    const response = await fetch(`https://www.github.com/${brand}`, fetchConfig);
    return response.status === 404;
  }
}

class NpmChecker implements Checker {
  namespace = 'npm';
  async check(brand: string): Promise<boolean> {
    const response = await fetch(`https://www.npmjs.com/package/${brand}`, fetchConfig);
    return response.status === 404;
  }
}

class PypiChecker implements Checker {
  namespace = 'pypi';
  async check(brand: string): Promise<boolean> {
    const response = await fetch(`https://pypi.org/project/${brand}`, fetchConfig);
    return response.status === 404;
  }
}

class CratesChecker implements Checker {
  namespace = 'crates';
  async check(brand: string): Promise<boolean> {
    const response = await fetch(`https://crates.io/api/v1/crates/${brand}`, fetchConfig);
    return response.status === 404;
  }
}

const checkers: Checker[] = [
  new GithubChecker(),
  new NpmChecker(),
  new PypiChecker(),
  new CratesChecker(),
];

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

  const all = await Promise.allSettled(checkers.map(async (checker) => {
    return {
      namespace: checker.namespace,
      available: await checker.check(parseBrand.data),
    };
  }));

  return {
    success: true,
    brand: parseBrand.data,
    results: all.reduce((acc, curr) => {
      if (curr.status === 'fulfilled') {
        acc[curr.value.namespace] = curr.value.available ? SearchStatus.AVAILABLE : SearchStatus.TAKEN;
      } else {
        acc[curr.reason.namespace] = SearchStatus.TAKEN;
      }
      return acc;
    }, {} as Record<string, SearchStatus>),
  };
};
