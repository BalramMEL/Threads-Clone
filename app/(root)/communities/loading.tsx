'use client'

import React, { FC } from 'react'
import {BounceLoader} from 'react-spinners'

interface LoadingProps{}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="w-full flex flex-col shadow animate-pulse">
        <div className="flex h-[42px] w-[120px] bg-gray-600 mt-6 text-left rounded-md mb-10">
        </div>
        <div className="flex h-[42px] bg-gray-600 text-left rounded-md mb-10">
        </div>

      <div className="flex gap-3 max-md:flex-col">
            <div className="flex bg-gray-600 text-left h-[170px] w-full rounded-lg">
              </div> 
            <div className="flex bg-gray-600 text-left h-[170px] w-full rounded-lg">
              </div>  
      </div>
    </div>
  )
}

export default Loading;