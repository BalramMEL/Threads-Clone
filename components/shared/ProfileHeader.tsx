import Image from 'next/image';
import React from 'react'

interface Props{
    accountId: string;
    authUserId:string;
    name:string;
    username: string;
    bio:string;
    imgUrl: string;
    type?: string
}

function ProfileHeader({
    accountId,
    authUserId,
    name,
    username,
    bio,
    imgUrl,
    type,
}: Props) {
    return (
        <div className='flex flex-col w-full justify-start'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='relative h-20 w-20 object-cover'>
                        <Image
                            src={imgUrl}
                            alt='logo'
                            fill
                            className='rounded-full object-cover shadow-2xl'
                        />
                    </div>

                    <div className='flex-1'>
                        <h2 className='text-left text-heading3-bold text-light-1'>
                            {name}
                        </h2>
                        <p className='text-base-medium text-gray-1'>@{username}</p> 
                    </div>
                </div>             
            </div>

            <p className='text-light-2 mt-6 max-w-lg text-base-regular'>
                {bio}
            </p>

            <div className='mt-12 h-0.5 bg-dark-3 w-full'/>
        </div>
    );
}

export default ProfileHeader;