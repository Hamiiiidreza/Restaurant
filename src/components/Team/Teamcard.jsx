import React from 'react'

export default function Teamcard({imgUrl, name, role}) {
    return (
        <div className='team-slider flex items-center'>
            <div className='team-card-wrap ml-[35px] h-auto'>
                <div className='team-card flex flex-col justify-center cursor-grab transition-all duration-300 ease-in-out group'>
                    <div className='team-img rounded-[10px] overflow-hidden'>
                        <img className='transition-all duration-200 ease-linear group-hover:scale-105' src={imgUrl} alt="teamimg1" />
                    </div>
                    <h3 className='text-white text-2xl font-bold mt-[25px]'>{name}</h3>
                    <span className=''>{role}</span>
                </div>
            </div>
        </div>
    )
}
