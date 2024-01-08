export default function BrandSearch() {

  async function search() {
    'use server';
  }

  return (
    <div className="text-center">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Brand Kit</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Search everywhere* for your next brand</p>
      <form action={'hi'}>
        <div className="mt-10 flex items-center justify-center gap-x-6">

          <input
            className="rounded-md bg-gray-50 px-3.5 py-2.5 text-sm font-normal text-black shadow-sm hover:bg-gray-100 outline outline-2 outline-offset-2 outline-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="text"
            placeholder={"Search for a brand"}
          >
          </input>
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </a>
        </div>
      </form>
      <div className="mt-10 flex items-center justify-center gap-x-6">

      </div>
    </div>
  )
}
