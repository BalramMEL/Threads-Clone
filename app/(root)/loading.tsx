'use client'

import React, { FC } from 'react'
import {BounceLoader} from 'react-spinners'

interface LoadingProps{}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex flex-col shadow animate-pulse">
  <div className="flex h-[42px] w-[120px] bg-gray-600 mt-4 text-left rounded-md mb-10">
  </div>

<div>
     <div className="flex bg-gray-600 text-left h-[210px] rounded-lg mb-7">
     </div>
     <div className="flex bg-gray-600 text-left h-[207px] rounded-lg">
     </div>
</div>  

</div>
  )
}

export default Loading;