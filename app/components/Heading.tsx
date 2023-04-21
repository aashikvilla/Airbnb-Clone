'use client'
import React from 'react'

interface HeadindProps{
    title:string,
    subTitle?:string,
    center?:boolean
}

function Heading({title,subTitle,center}:HeadindProps) {
  return (
    <div className={center? 'text-center': 'text-start' }>
        <div className='text-2xl font-bold'>
            {title}
        </div>
        <div className='font-light text-nuetral-500 mt-2'>
            {subTitle}
        </div>

    </div>
  )
}

export default Heading