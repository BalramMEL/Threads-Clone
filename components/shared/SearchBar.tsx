"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';


interface Props{
    routeType: string;
}

const SearchBar = ({ routeType }: Props) => {
    const router = useRouter();
    const[search, setSearch] = useState('');

    // Query after 0.3s of no input
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                router.push(`/${routeType}?q=` + search);
            } else {
                router.push(`/${routeType}`);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, routeType])


  return (
      <div className='searchbar'>
          <Image
            src='/assets/search-gray.svg'
              alt='search'
              width={24}
              height={24}
          />
          <Input
              id='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                  `${routeType !== "/search" ? "Search Communities" : "Search Person"}`
              }
              className='no-focus searchbar_input'
          />
    </div>
  )
}

export default SearchBar