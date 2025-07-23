import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ products, onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    // فیلتر محصولات بر اساس عبارت جستجو
    const filteredProducts = useMemo(() => {
        if (!inputValue.trim()) return [];

        const searchTerm = inputValue.trim().toLowerCase();
        return products.filter(product => {
            if (product.title.toLowerCase().includes(searchTerm)) return true;
            return product.specs.some(spec =>
                spec.name.toLowerCase().includes(searchTerm) ||
                spec.value.toLowerCase().includes(searchTerm)
            );
        });
    }, [inputValue, products]);

    // مدیریت کلیک خارج از کامپوننت
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFocus = () => {
        setShowResults(true);
        onSearch(inputValue); // اعمال جستجو در لیست اصلی
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value); // اعمال جستجو در لیست اصلی
        setShowResults(true);
    };

    const handleProductClick = (productId) => {
        navigate(`/Store/Shopdetails/${productId}`);
        setShowResults(false);
    };

    // هندلر جدید برای کلیک روی آیکن جستجو
    const handleSearchIconClick = (e) => {
        e.preventDefault();

        if (filteredProducts.length > 0) {
            // مسیریابی به اولین محصول
            handleProductClick(filteredProducts[0].id);
        } else {
            // نمایش پیام عدم وجود نتیجه
            setShowResults(true);
        }
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <form
                className='relative'
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="text"
                    placeholder='جست و جو'
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    className='bg-transparent border-b border-b-solid border-b-white border-b-opacity-15 h-[49px] py-[10px] pr-5 pl-[50px] text-base text-[#D2D2D2] w-full border border-solid border-black border-opacity-15 outline-none'
                />
                <button
                    className='absolute flex items-center justify-center top-[5px] left-[5px] h-[calc(100%_-_10px)] rounded-[10px] bg-transparent text-white cursor-pointer py-[5px] px-[12.5px]'
                    onClick={handleSearchIconClick}
                >
                    <FiSearch />
                </button>
            </form>

            {/* نمایش نتایج جستجو */}
            {showResults && inputValue && (
                <div className="absolute z-50 w-full mt-1 bg-[#1e1f2b] shadow-lg rounded-md max-h-60 overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                        <ul className="divide-y divide-gray-700">
                            {filteredProducts.map(product => (
                                <li
                                    key={product.id}
                                    className="p-3 hover:bg-[#2a2b3a] cursor-pointer transition-colors"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-200 rounded-lg border border-gray-300 w-12 h-12 overflow-hidden">
                                            {product.imgUrl && (
                                                <img
                                                    src={product.imgUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-white truncate">{product.title}</h3>
                                            <p className="text-white/80 text-sm truncate">
                                                {product.specs.slice(0, 2).map((spec, index) => (
                                                    <span key={index}>
                                                        {spec.name}: {spec.value}
                                                        {index < 1 ? ' | ' : ''}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-white/80">
                            محصولی یافت نشد
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;