import React, { useEffect, useState, useContext } from 'react'
import ProductsCard from './ProductsCard';
import { FiSearch } from "react-icons/fi";
import { useGetData } from '@/hooks/UseGetData';
import { getProducts } from '@/Utils/Fetchs';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'react-router-dom';
import containerContext from '@/Context/containerContext.js';
import Sortoptions from '../Sortoptions/Sortoptions';


const Products = ({ displayCount }) => {

  const contextData = useContext(containerContext)

  const { data, isFetching, refetch } = useGetData(["products"], getProducts);
  const { id } = useParams();

  let row = displayCount;
  let endIndex = id ? id * row : 1 * row;
  let startIndex = endIndex - row
  const displayedDatas = contextData.filteredProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (data) {
      contextData.setDatas(data);
      contextData.setFilteredProducts(data);
    }
  }, [data]);

  if (isFetching) {
    return <div>در حال بارگذاری  ...</div>
  }


  return (
    <div className='products py-[130px]'>
      <div className='container'>
        <div className='products-head flex justify-between items-center mb-[45px]'>
          <div className='products-head_right w-[66.66%] flex items-center justify-center bg-transparent'>
            <form action="#" className='relative w-[50%] pl-3'>
              <input type="text" placeholder='جست و جو' className='bg-transparent border-b border-b-solid border-b-white border-b-opacity-15 h-[49px] py-[10px] pr-5 pl-[50px] text-base text-[#D2D2D2] w-full border border-solid border-black border-opacity-15 outline-none' />
              <button className='absolute flex items-center justify-center top-[5px] left-[5px] h-[calc(100%_-_10px)] rounded-[10px] bg-transparent text-white cursor-pointer py-[5px] px-[12.5px]'>
                <FiSearch />
              </button>
            </form>
            <div className='w-[50%] px-3'>
              <p className='text-lg text-[#D2D2D2] font-bold'>نمایش همه ۱۲ نتیجه</p>
            </div>
          </div>
          <div className='products-head_left w-[33.33%] px-3 text-left'>
            <Sortoptions />
          </div>
        </div>
        <div className='products-wrap flex flex-wrap justify-center'>
          <ProductsCard />
        </div>
        <Pagination
          items={data}
          itemsCount={3}
          pathName="/Store/Shopgrid"
          setShownDatas={contextData.setFilteredProducts}
        />
      </div>
    </div>
  );
};

export default Products;
