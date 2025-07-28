import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import containerContext from '@/Context/containerContext';
import SearchModal from '../Searchmodal/SearchModal';
import { useGetData } from '@/hooks/UseGetData';
import { getProducts } from '@/Utils/Fetchs';


export default function Topbar() {

  const contextData = useContext(containerContext);
  const location = useLocation();

  const [showSearchModal, setShowSwarchModal] = useState(false);
  const openSearchModal = () => setShowSwarchModal(true);
  const closeSearchModal = () => setShowSwarchModal(false);

  const { data: products } = useGetData(["products"], getProducts);

  const [allMenus, setAllMenus] = useState([
    { name: 'صفحه اصلی', path: '/' },
    { name: 'درباره', path: '/About' },
    {
      name: 'منو', subMenus: [{ subMenu: { name: 'منو رستوران', path: '/Menu/Restaurantmenu' } },
      { subMenu: { name: 'منو قهوه', path: '/Menu/Coffeemenu' } }], path: ''
    },
    {
      name: 'صفحه', subMenus: [{
        subMenu: {
          name: 'خدمات', path: '',
          subSubMenus:
            [
              { subSubMenu: { name: 'همه خدمات', path: '/Plate/Services' } },
              { subSubMenu: { name: 'جزئیات خدمات', path: '/Plate/Servicedetails' } }

            ]
        }
      },
      {
        subMenu: {
          name: 'نمونه کارها', path: '',
          subSubMenus: [
            { subSubMenu: { name: 'نمونه کارها', path: '/Plate/Portfolio' } },
            { subSubMenu: { name: 'جزئیات نمونه کارها', path: '/Plate/Portfoliodetails' } }
          ]
        }
      },
      { subMenu: { name: 'میز رزرو کنید', path: '/Plate/Bookatable' } },
      { subMenu: { name: 'آشپزی های ما', path: '' } },
      { subMenu: { name: 'گواهینامه', path: '' } },
      { subMenu: { name: 'تاریخچه ما', path: '' } },
      { subMenu: { name: 'طرح قیمت گذاری', path: '' } },
      { subMenu: { name: 'گالری', path: '' } },
      { subMenu: { name: 'سوالات متداول', path: '' } },
      { subMenu: { name: 'شرایط و ضوابط', path: '' } }
      ], path: ''
    },
    {
      name: 'فروشگاه', subMenus: [{ subMenu: { name: 'نوار سمت راست', path: '' } },
      { subMenu: { name: 'نوار سمت چپ', path: '' } },
      { subMenu: { name: 'شبکه فروشگاه', path: '/Store/Shopgrid' } },
      { subMenu: { name: 'جزئیات فروشگاه', path: '/Store/Shopdetails' } },
      { subMenu: { name: 'سبد خرید', path: '/Store/Shoppingcart' } },
      { subMenu: { name: 'لیست علاقه مندی ها', path: '' } },
      { subMenu: { name: 'پرداخت پول', path: '/Store/Checkout' } },
      { subMenu: { name: 'حساب من', path: '/Store/Myaccount' } }
      ], path: ''
    },
    {
      name: 'وبلاگ', subMenus: [{
        subMenu: {
          name: 'طرح بندی وبلاگ', path: '',
          subSubMenus: [{ subSubMenu: { name: 'نوار سمت راست', path: '' } },
          { subSubMenu: { name: 'نوار سمت چپ', path: '' } },
          { subSubMenu: { name: 'شبکه وبلاگ', path: '' } }]
        }
      }, {
        subMenu: {
          name: 'جزئیات طرح بندی وبلاگ', path: '',
          subSubMenus: [{ subSubMenu: { name: 'نوار سمت چپ طرح بندی وبلاگ', path: '' } },
          { subSubMenu: { name: 'نوار سمت راست طرح بندی وبلاگ', path: '' } },
          { subSubMenu: { name: 'جزئیات وبلاگ بعنوان نوار کناری', path: '' } }]
        }
      }], path: '/Blog'
    },
    { name: 'ارتباط', path: '/Communication' }
  ]);

  // تابع بررسی فعال بودن مسیر
  const isActive = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // تابع بررسی فعال بودن منو با زیرمنوها
  const isMenuActive = (menu) => {
    if (isActive(menu.path)) return true;
    if (menu.subMenus) {
      return menu.subMenus.some(subMenu =>
        isActive(subMenu.subMenu.path) ||
        (subMenu.subMenu.subSubMenus &&
          subMenu.subMenu.subSubMenus.some(subSubMenu =>
            isActive(subSubMenu.subSubMenu.path)
          )
        )
      );
    }
    return false;
  };

  // تابع بررسی فعال بودن زیرمنو
  const isSubMenuActive = (subMenu) => {
    return isActive(subMenu.subMenu.path) ||
      (subMenu.subMenu.subSubMenus &&
        subMenu.subMenu.subSubMenus.some(subSubMenu =>
          isActive(subSubMenu.subSubMenu.path)
        )
      );
  };

  // تابع بررسی فعال بودن زیرزیرمنو
  const isSubSubMenuActive = (path) => {
    return isActive(path);
  };

  return (
    <>
      <div className='topbar sticky bg-[#12131B] border-b border-b-[#27282C] w-full h-[100px] z-50 top-0 right-0 left-0'>
        <div className='container h-full'>
          <nav className='flex items-center justify-between flex-wrap h-full'>
            <Link to="/" className='pt-[0.3125rem] pb-[0.3125rem] text-xl whitespace-nowrap'>
              <img className='max-w-full h-auto' src="../../Public/Img/Logo-white.webp" alt="logo" />
            </Link>
            <div className='inline-flex justify-center ml-2.5'>
              <ul className='flex w-[70%] ml-[72px] h-[100px]'>

                {allMenus.map((menu) => (
                  <li
                    className={`relative inline-flex ml-[18px] pl-[18px] cursor-pointer group`}
                    key={crypto.randomUUID()}
                  >
                    <div className={`menu-link custom-after flex items-center justify-center text-center group-hover:text-orange-250 transition-colors
                    ${isMenuActive(menu) ? 'text-orange-250 active' : 'text-white'}`}>

                      <Link to={menu.path} className="inline-flex items-center gap-0.5 font-bold whitespace-nowrap">
                        {menu.name}
                        {menu.subMenus && (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                              <path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" />
                            </svg>
                            <ul className="submenu-dropdown">
                              {menu.subMenus.map((subMenu) => (
                                <li
                                  className={`submenu-item relative m-0 text-right gap-3 flex border-b border-b-[#27282C] items-center justify-between
                                  ${isSubMenuActive(subMenu) ? 'text-orange-250' : 'text-white'}`}
                                  key={crypto.randomUUID()}
                                >
                                  <Link
                                    to={subMenu.subMenu.path}
                                    className={`submenu-link hover:text-orange-250 block py-[13px] w-full transition-colors
                                    ${isSubMenuActive(subMenu) ? 'text-orange-250 active' : ''}`}
                                  >
                                    {subMenu.subMenu.name}
                                  </Link>
                                  {subMenu.subMenu.subSubMenus && subMenu.subMenu.subSubMenus.length > 0 && (
                                    <>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className={`size-4 ${isSubMenuActive(subMenu) ? 'text-orange-250' : ''}`}>
                                        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                                      </svg>
                                      <ul className="subsubmenu-dropdown">
                                        {subMenu.subMenu.subSubMenus.map((subSubMenu) => (
                                          <li className="m-0 text-right" key={crypto.randomUUID()}>
                                            <Link
                                              to={subSubMenu.subSubMenu.path}
                                              className={`subsubmenu-link block py-[13px] hover:text-orange-250 transition-colors border-b border-b-[#27282C]
                                              ${isSubSubMenuActive(subSubMenu.subSubMenu.path) ? 'text-orange-250 active' : 'text-white'}`}
                                            >
                                              {subSubMenu.subSubMenu.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </Link>
                    </div>
                  </li>
                ))}

              </ul>
              <div className='w-[30%] flex justify-center items-center gap-4'>
                <button
                  onClick={openSearchModal}
                  className='flex items-center justify-center w-[45px] h-[45px] border border-[#38393D] rounded-full hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.5s]'
                >
                  <HiOutlineSearch className='size-6' />
                </button>
                <Link to='/Store/Shoppingcart' className='relative flex items-center justify-center w-[45px] h-[45px] border border-[#38393D] rounded-full hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.5s]'>
                  <HiOutlineShoppingBag className='size-6' />
                  <span className="shop-badge">
                    {contextData.cartItems}
                  </span>
                </Link>

                {
                  contextData.isLoggedIn ? (
                    <Link to='/my-account' className=''>
                      <span className='text-white font-semibold py-[12px] px-8 z-10 overflow-hidden rounded-[50px] border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.s]'>
                        {contextData.userInfos.username}
                      </span>
                    </Link>
                  ) : (<Link to="/Store/Myaccount" className='flex items-center justify-center w-[45px] h-[45px] border border-[#38393D] rounded-full hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.5s]'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </Link>)
                }
              </div>
            </div>
          </nav >
        </div >
      </div >
      {showSearchModal && <SearchModal onClose={closeSearchModal} products={products} />}
    </>
  );
}

