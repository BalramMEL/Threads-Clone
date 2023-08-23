'use client'

import React, { FC } from 'react'
import {BounceLoader} from 'react-spinners'

interface LoadingProps{}

const Loading: FC<LoadingProps> = ({}) => {
  return (
      
  <div className="w-full flex flex-col shadow animate-pulse">
  <div className="flex h-[42px] w-[120px] bg-gray-600 mt-4 text-left rounded-md mb-10">
  </div>
  <div className="flex h-[42px] bg-gray-600 text-left rounded-md mb-10">
  </div>

  <div className="mb-8">
    <div className="flex items-center justify-between text-left">
      <div className="flex items-center">
        <div>
          <svg className="w-[48px] h-[48px] text-gray-600 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        </div>
        <div>
            <div className="h-[20px] rounded-md bg-gray-600 w-24 mb-1.5"></div>
            <div className="w-32 h-[19px] rounded-md bg-gray-600"></div>
        </div>
      </div>

        <div className="h-[38px] w-[84px] rounded-md bg-gray-600"></div>
    </div>
  </div>

   <div className="mb-8">
    <div className="flex items-center justify-between text-left">
      <div className="flex items-center">
        <div>
          <svg className="w-[48px] h-[48px] text-gray-600 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        </div>
        <div>
            <div className="h-[20px] rounded-md bg-gray-600 w-24 mb-1.5"></div>
            <div className="w-32 h-[19px] rounded-md bg-gray-600"></div>
        </div>
      </div>

        <div className="h-[38px] w-[84px] rounded-md bg-gray-600"></div>
    </div>
      </div>
      
       <div className="mb-8">
    <div className="flex items-center justify-between text-left">
      <div className="flex items-center">
        <div>
          <svg className="w-[48px] h-[48px] text-gray-600 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        </div>
        <div>
            <div className="h-[20px] rounded-md bg-gray-600 w-24 mb-1.5"></div>
            <div className="w-32 h-[19px] rounded-md bg-gray-600"></div>
        </div>
      </div>

        <div className="h-[38px] w-[84px] rounded-md bg-gray-600"></div>
    </div>
  </div>

</div>
  );
};

export default Loading;