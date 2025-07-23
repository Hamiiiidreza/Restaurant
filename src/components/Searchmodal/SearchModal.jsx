import React, { useEffect, useState, useRef, useMemo } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import CustomScrollbar from '../Scrollbar/Scrollbar';

export default function SearchModal({ onClose, products = [] }) {
    const inputRef = useRef(null);
    const modalContentRef = useRef(null);
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [shouldPulse, setShouldPulse] = useState(false);
    const navigate = useNavigate();

    // Hook for body overflow handling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                setShouldPulse(true);
                setTimeout(() => setShouldPulse(false), 300);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter products based on search input
    const filteredProducts = useMemo(() => {
        if (!inputValue.trim()) return [];

        const searchTerm = inputValue.trim().toLowerCase();
        return products.filter(product => {
            // Search in title
            if (product.title.toLowerCase().includes(searchTerm)) return true;

            // Search in specs
            return product.specs.some(spec =>
                spec.name.toLowerCase().includes(searchTerm) ||
                spec.value.toLowerCase().includes(searchTerm)
            );
        });
    }, [inputValue, products]);

    const handleFocus = () => setPlaceholderVisible(false);
    const handleBlur = () => inputValue === '' && setPlaceholderVisible(true);

    const handleClickSearch = (e) => {
        e.preventDefault(); // جلوگیری از رفتار پیشفرض فرم

        if (!inputValue.trim()) {
            // اگر فیلد جستجو خالی بود
            setShouldPulse(true);
            setTimeout(() => setShouldPulse(false), 300);
            return;
        }

        if (filteredProducts.length > 0) {
            // اگر نتایج وجود داشت به اولین محصول پیمایش کن
            const firstProduct = filteredProducts[0];
            handleProductClick(firstProduct.id);
        } else {
            // اگر نتیجه‌ای یافت نشد
            setShouldPulse(true);
            setTimeout(() => setShouldPulse(false), 300);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/Store/Shopdetails/${productId}`);
        onClose();
    };

    return (
        <div className='searchmodal block overflow-x-hidden fixed top-0 left-0 z-[999] w-full h-full overflow-y-auto transition-opacity duration-300 ease-linear'>
            <div className="modal-dialog relative flex flex-col justify-center m-0 w-full h-full max-w-full py-[30px] px-[15px] bg-center bg-[#41414159] backdrop-blur-[5px] animate-fadeIn">
                <div
                    ref={modalContentRef}
                    className={`modal-content relative flex flex-col items-center justify-center gap-2 border-0 padding-0 max-w-[720px] bg-transparent mx-auto w-full transition-transform duration-500 ease-in-out ${shouldPulse ? 'scale-105' : 'scale-100'}`}
                >
                    <div className="flex items-center w-full gap-2">
                        <form
                            className='relative w-[calc(100%_-_40px)] transition-all duration-300 ease-in-out transform'
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                ref={inputRef}
                                type=""
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='h-[65px] rounded-[5px] outline-none w-full text-white text-sm border border-solid border-white/20 bg-transparent px-[18px] py-[6px] font-semibold pl-[70px]'
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                autoFocus
                            />
                            <span
                                className={`absolute top-1/2 right-[20px] transform -translate-y-1/2 text-white/70 text-sm font-semibold transition-opacity duration-500 ease-in-out pointer-events-none ${placeholderVisible ? 'opacity-100' : 'opacity-0'}`}
                            >
                                جست و جو....
                            </span>
                            <button
                                type='submit'
                                onClick={handleClickSearch}
                                className='absolute top-[5px] left-[5px] border-0 h-[calc(100%_-_10px)] py-[10px] px-[27px] rounded-[5px] text-white  transition-all ease-in duration-500 bg-[#732701] cursor-pointer flex items-center justify-center hover:bg-transparent'
                            >
                                <HiOutlineSearch className='size-5 absolute right-0 left-0 top-1/2 text-white text-[17px] -translate-y-1/2 w-full' />
                            </button>
                        </form>
                        <button
                            type='button'
                            onClick={onClose}
                            className={`p-2 z-20 opacity-100 cursor-pointer bg-transparent flex items-center justify-center transition-transform duration-300 ease-in-out`}
                        >
                            <IoMdClose className='size-7 text-white' />
                        </button>
                    </div>

                    {/* Results container */}
                    {inputValue && (
                        <CustomScrollbar className="
                           w-[calc(100%_-_52px)]
                           self-start 
                           bg-white/10 backdrop-blur-lg 
                           rounded-lg mt-2 max-h-[400px] 
                           overflow-y-auto
                           transition-all duration-300
                           hover:shadow-[0_0_15px_rgba(115,39,1,0.5)]"
                           >
                            {filteredProducts.length > 0 ? (
                                <ul className="divide-y divide-white/20">
                                    {filteredProducts.map(product => (
                                        <li
                                            key={product.id}
                                            className="p-4 group cursor-pointer hover:bg-white/20 transition-all duration-200"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="
                                                        bg-gray-200 rounded-lg border border-gray-300 
                                                        w-16 h-16 overflow-hidden transition-transform
                                                        duration-300 group-hover:scale-105"
                                                >
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
                                                    <p className="text-white/80 text-sm mt-1 truncate">
                                                        {product.specs.slice(0, 2).map((spec, index) => (
                                                            <span key={index}>
                                                                {spec.name}: {spec.value}
                                                                {index < product.specs.slice(0, 2).length - 1 ? ' | ' : ''}
                                                            </span>
                                                        ))}
                                                    </p>
                                                    <p className="text-white mt-1 font-medium">{parseInt(product.price).toLocaleString()} تومان</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-white/80">
                                    محصولی با مشخصات جستجو شده یافت نشد
                                </div>
                            )}
                        </CustomScrollbar>
                    )}
                </div>
            </div>
        </div >
    )
}