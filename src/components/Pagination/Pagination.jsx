import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({ items, itemsCount, pathName }) => {
    const [pagesCount, setPagesCount] = useState(0);
    const navigate = useNavigate();
    const { id: pageParam } = useParams();
    const currentPage = Number(pageParam) || 1;

    // محاسبه تعداد صفحات بر اساس تعداد آیتم‌ها در هر صفحه
    useEffect(() => {
        if (items && itemsCount > 0) {
            const totalPages = Math.ceil(items.length / itemsCount);
            setPagesCount(totalPages);
        }
    }, [items, itemsCount]);

    // رفتن به صفحه بعدی
    const handleNextPage = () => {
        if (currentPage < pagesCount) {
            navigate(`${pathName}/${currentPage + 1}`);
        }
    };

    // رفتن به صفحه قبلی
    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(`${pathName}/${currentPage - 1}`);
        }
    };

    // تولید صفحات
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(
                <li className='inline-block mx-2' key={i}>
                    <Link
                        to={`${pathName}/${i}`}
                        className={`flex items-center justify-center text-[22px] z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer transition-all duration-200 ease-linear ${i === currentPage
                                ? 'bg-orange-250'
                                : 'bg-[#24252A] hover:bg-orange-250'
                            }`}
                    >
                        {i}
                    </Link>
                </li>
            );
        }
        return pages;
    };

    return (
        <ul className='text-center mt-4'>
            {/* دکمه قبلی */}
            <li className='inline-block mx-2'>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer ${currentPage === 1
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-[#24252A] hover:bg-orange-250'
                        }`}
                >
                    <IoIosArrowForward className='text-white text-xl font-bold' />
                </button>
            </li>

            {/* شماره صفحات */}
            {renderPageNumbers()}

            {/* دکمه بعدی */}
            <li className='inline-block mx-2'>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === pagesCount}
                    className={`flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer ${currentPage === pagesCount
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-[#24252A] hover:bg-orange-250'
                        }`}
                >
                    <IoIosArrowBack className='text-white text-xl font-bold' />
                </button>
            </li>
        </ul>
    );
};

export default Pagination;