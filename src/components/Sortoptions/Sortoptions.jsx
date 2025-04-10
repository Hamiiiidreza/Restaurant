import React, { useContext } from 'react';
import containerContext from '@/Context/containerContext';

const Sortoptions = () => {
    const contextData = useContext(containerContext);

    const handleSortChange = (event) => {
        const sortOption = event.target.value;

        if (!contextData.datas) return;

        let sortedProducts;

        switch (sortOption) {
            case "priceLowToHigh":
                sortedProducts = [...contextData.datas].sort((a, b) => a.price - b.price);
                break;

            case "priceHighToLow":
                sortedProducts = [...contextData.datas].sort((a, b) => b.price - a.price);
                break;

            default:
                sortedProducts = contextData.datas;
                break;
        }

        contextData.setFilteredProducts(sortedProducts);
    };

    return (
        <select
            onChange={handleSortChange}
            className='rounded-[10px] text-lg font-bold py-3 px-[15px] outline-none w-full bg-[#151B20] max-w-[280px] bg-[url(https://rtlme.ir/Etar/assets/img/down-arrow-2.svg)] bg-no-repeat bg-[14px]'
        >
            <option value="default">مرتب سازی پیش فرض</option>
            <option value="priceHighToLow">قیمت: بالا به پایین</option>
            <option value="priceLowToHigh">قیمت: کم به بالا</option>
        </select>
    )
}

export default Sortoptions;
