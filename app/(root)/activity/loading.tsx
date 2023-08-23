'use client'

import React, { FC } from 'react'

interface LoadingProps{}

const Loading: FC<LoadingProps> = ({}) => {
  return (
      <div className="w-full flex flex-col shadow animate-pulse">
        <div className="flex h-[42px] w-[120px] bg-gray-600 mt-4 text-left rounded-md mb-7"></div>
        
        <div className='flex flex-col'>
          <div className="flex h-[42px] bg-gray-600 text-left rounded-md mb-4"></div>
          <div className="flex h-[42px] bg-gray-600 text-left rounded-md mb-4"></div>      
        </div>        
      
      </div>

  )
}

export default Loading;