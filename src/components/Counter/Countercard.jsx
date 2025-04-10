import React from 'react'

export default function Countercard({ number, name }) {
    return (
        <div className='counter-card w-[25%] mb-[30px] pr-[30px]'>
            <h4 className='text-orange-250 mb-[10px] text-8xl font-bold leading-[96px]'>
                <span>{number}</span>
                +
            </h4>
            <p className='text-lg text-white font-bold'>{name}</p>
        </div>
    )
}
