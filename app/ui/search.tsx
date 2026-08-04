'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  
  // Read-Only current paramater
  // Empty parameter at first visit on /dashboard/invoices/
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    // Exact copy of the searchParams, except this one is mutable/editable
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // pathname = "/dashboard/invoices"
    // params = "query={term}"
    // example = "/dashboard/invoices?query=lee"
    replace(`${pathname}?${params.toString()}`);
    // Wait 0.3s before running the function
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // keep the user's search term visible in the input even after page refresh
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
