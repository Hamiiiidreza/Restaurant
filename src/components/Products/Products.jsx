import React, { useEffect, useState, useContext } from 'react'
import ProductsCard from './ProductsCard';
import SearchInput from '../SearchInput/SearchInput';
import { useGetData } from '@/hooks/UseGetData';
import { getProducts } from '@/Utils/Fetchs';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'react-router-dom';
import containerContext from '@/Context/containerContext.js';
import Sortoptions from '../Sortoptions/Sortoptions';
import { useNavigate } from 'react-router-dom';


const Products = ({ displayCount = 8 }) => {

  const navigate = useNavigate();
  const contextData = useContext(containerContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isFetching, refetch } = useGetData(["products"], getProducts);
  const { id } = useParams();

  // توابع جدید برای مدیریت جستجو
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    // بازنشانی صفحه به 1 هنگام جستجو
    navigate('/Store/Shopgrid/1');

    if (!searchTerm.trim()) {
      contextData.setFilteredProducts(data || []);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = (data || []).filter(product => {
      if (product.title.toLowerCase().includes(term)) return true;
      return product.specs.some(spec =>
        spec.name.toLowerCase().includes(term) ||
        spec.value.toLowerCase().includes(term)
      );
    });

    contextData.setFilteredProducts(filtered);
  };

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
            <div className='w-[50%] pl-3'>
              <SearchInput
                products={data || []}
                onSearch={handleSearch}
              />
            </div>
            <div className='w-[50%] px-3'>
              <p className='text-lg text-[#D2D2D2] font-bold'>
                نمایش {contextData.filteredProducts.length} نتیجه
              </p>
            </div>
          </div>
          <div className='products-head_left w-[33.33%] px-3 text-left'>
            <Sortoptions />
          </div>
        </div>
        <div className='products-wrap flex flex-wrap justify-center'>
          <ProductsCard products={displayedDatas} />
        </div>
        {/* نمایش پیام "محصولی یافت نشد" به جای پِیجینیشن */}
        {searchTerm && contextData.filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white text-lg">محصولی با مشخصات جستجو شده یافت نشد</p>
          </div>
        ) : (
          <Pagination
            items={contextData.filteredProducts}
            itemsCount={displayCount}
            pathName="/Store/Shopgrid"
          />
        )}
      </div>
    </div>
  );
};

export default Products;
