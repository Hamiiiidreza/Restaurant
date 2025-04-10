import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";


const Pagination = ({ items, itemsCount, pathName }) => {

    const [pagesCount, setPagesCount] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        let pagesNumber = Math.ceil(items.length / itemsCount)
        setPagesCount(pagesNumber)
    }, [id, itemsCount])

    const handleNextPage = () => {
        const nextPage = Number(id) < 3 ? Number(id) + 1 : 3;
        navigate(`${pathName}/${nextPage}`);
    };

    const handlePrevPage = () => {
        const prevPage = Number(id) > 1 ? Number(id) - 1 : 1;
        navigate(`${pathName}/${prevPage}`);   
    };

    return (
        <ul className='text-center mt-4'>
            <li className='inline-block mx-2'
                onClick={handlePrevPage}>
                <Link className='flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer bg-[#24252A] transition-all duration-200 ease-linear hover:bg-orange-250' to="">
                    <IoIosArrowForward className='text-white text-xl font-bold' />
                </Link>
            </li>
            {
                Array(pagesCount)
                    .fill(0)
                    .map((item, index) => (
                        <li className='inline-block mx-2' key={crypto.randomUUID()}>
                            {
                                index + 1 === Number(id) || (!Number(id) && index + 1 === 1 ) ? (
                                    <Link to={`${pathName}/${index + 1}`} className='flex items-center justify-center text-[22px] z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer transition-all duration-200 ease-linear bg-orange-250'>
                                        {
                                            index + 1
                                        }
                                    </Link>
                                ) : (
                                    <Link to={`${pathName}/${index + 1}`} className='flex items-center justify-center text-[22px] z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer transition-all duration-200 ease-linear bg-[#24252A] hover:bg-orange-250'>
                                        {
                                            index + 1
                                        }
                                    </Link>
                                )
                            }

                        </li>
                    ))
            }
            <li className='inline-block mx-2'
                onClick={handleNextPage}>
                <Link className='flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer bg-[#24252A] transition-all duration-200 ease-linear hover:bg-orange-250' to="">
                    <IoIosArrowBack className='text-white text-xl font-bold' />
                </Link>
            </li>
        </ul>
    )
};

export default Pagination;
