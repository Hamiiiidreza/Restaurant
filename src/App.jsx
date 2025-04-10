import { useState, useCallback, useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import routes from './routes';
import './App.css';
import { useQueryClient } from '@tanstack/react-query';
import { getUsers, getCartByUserId, updatedCart } from './Utils/Fetchs';
import { useGetData } from './hooks/UseGetData';
import { Toaster } from './components/ui/toaster';
import containerContext from './Context/containerContext.js';
import Cookies from 'js-cookie';
import swal from 'sweetalert';

function App() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({ id: null });
  const [datas, setDatas] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);


  const login = useCallback(async (userData, token) => {
    // پاک سازی سبد خرید قبلی هنگام لاگین
    setUserCart([]);
    setUserInfos({});
    setToken(null);
    Cookies.remove('cartBackup');

    // دریافت سبد خرید از سرور
    const cart = await getCartByUserId(userData.id);
    setUserCart(cart.products || []);

    Cookies.set('authToken', token, { expires: 7 });
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos({ ...userData, theme: userData.theme || 'dark' });

    swal({
      title: "خوش آمدید!",
      text: "شما با موفقیت وارد شدید",
      icon: "success",
      confirmButtonText: "ادامه",
    }).then(() => {
      navigate("/my-account");
    });
  }, [queryClient, navigate]);

  const logout = useCallback(async () => {
    setToken(null);
    setUserInfos({});
    setIsLoggedIn(false);
    setUserCart([]);
    Cookies.remove('authToken');
    Cookies.remove('cartBackup');
    queryClient.removeQueries();
  }, [queryClient]);

  useEffect(() => {
    const calculateTotal = () => {
      if (Array.isArray(userCart)) {
        const total = userCart.reduce((acc, item) => {
          const price = Number(item.price) || 0;
          const count = Number(item.count) || 1;
          return acc + (price * count);
        }, 0);
        setCartTotal(total);
      } else {
        setCartTotal(0);
      }
    };

    calculateTotal();
  }, [userCart]);

  const { data: users } = useGetData(['users'], getUsers, { enabled: !!Cookies.get('authToken') });

  useEffect(() => {
    const fetchUserData = async () => {
      const tokenFromCookie = Cookies.get('authToken');
      if (tokenFromCookie) {
        const response = await fetch(`http://localhost:4000/users`, {
          headers: { 'Authorization': `Bearer ${tokenFromCookie}` }
        });
        const users = await response.json();
        const loggedInUser = users.find(user => user.token === tokenFromCookie);

        if (loggedInUser && !userInfos.id) {
          setUserInfos({ ...loggedInUser, theme: loggedInUser.theme || 'dark' });
          setIsLoggedIn(true);
          setToken(tokenFromCookie);
          queryClient.invalidateQueries(['cart', loggedInUser.id]);
        }
      }
    };
    fetchUserData();
  }, []);


  const { data: serverCart } = useGetData(['cart', userInfos?.id],
    () => getCartByUserId(userInfos.id),
    {
      enabled: !!isLoggedIn,
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        if (data && JSON.stringify(data) !== JSON.stringify(userCart)) {
          setUserCart(data);
        }
      }
    }
  );

  //  useEffect(() => {
  //  const loadCart = async () => {
  //  try {
  //  if (isLoggedIn && userInfos?.id) {
  //کاربر لاگین کرده بارگیری از سرور
  //  const response = await fetch(`http://localhost:4000/cart?userId=${userInfos.id}`);
  //  const serverCart = await response.json();
  //  setUserCart(serverCart);
  //  } else {
  //  setUserCart([]);
  //  }
  //  } catch (error) {
  //  console.error('خطا در بارگیری سبد خرید:', error);
  //  }
  //  };

  //  loadCart();
  //  }, [isLoggedIn, userInfos]);


  //  useEffect(() => {
  //    prevUserCartRef.current = userCart;
  //  });

  useEffect(() => {
    const saveCart = async () => {
      try {
        if (isLoggedIn) {
          await updatedCart(userInfos.id, userCart);
          // آپدیت دستی کش برای جلوگیری از رفرش صفحه
          queryClient.setQueryData(['cart', userInfos.id], { products: userCart });
        }
      } catch (error) {
        console.error('خطای ذخیره سازی:', error);
      }
    };
    // اضافه کردن تاخیر برای جلوگیری از درخواست های پشت سرهم
    const timer = setTimeout(saveCart, 500);
    return () => clearTimeout(timer);
  }, [userCart, isLoggedIn, token, userInfos?.id, queryClient]);

  useEffect(() => {
    if (serverCart?.products) {
      setUserCart(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(serverCart.products)) {
          return serverCart.products;
        }
        return prev;
      })
    }
  }, [serverCart]);

  useEffect(() => {
    if (Array.isArray(userCart)) {
      const totalItems = userCart.length;
      setCartItems(totalItems);
    } else {
      setCartItems(0);
    }
  }, [userCart]);


  const addToCart = (product) => {
    if (!isLoggedIn) {
      swal({
        title: "نیاز به ثبت نام",
        text: "برای افزودن محصول به سبد خرید باید وارد شوید",
        icon: "warning",
        buttons: ["ورود/ثبت نام", "لغو"]
      }).then((confirm) => {
        if (confirm) navigate('/Store/Myaccount');
      });
      return;
    }

    const existingItem = userCart.find(item => String(item.id) === String(product.id));
    const newCart = existingItem
      ? userCart.map(item =>
        item.id === product.id
          ? { ...item, count: (item.count || 1) + 1 }
          : item
      )
      : [...userCart, { ...product, count: 1 }];
    setUserCart(newCart);
    updatedCart(userInfos.id, newCart);
    queryClient.invalidateQueries(['cart', userInfos.id]);
  };

  const removeProduct = useCallback(async (productId) => {
    try {
      if (!userInfos.id) {
        throw new Error('User not authenticated');
      }
      const newCart = userCart.filter(product => String(product.id) !== String(productId));
      // اضافه کردن تاخیر مصنوعی 2 ثانیه ای برای نمایش لودینگ
      await new Promise(resolve => setTimeout(resolve, 2000));
      // حذف فوری از استیت محلی
      setUserCart(newCart);

      // آپدیت سرور
      await updatedCart(userInfos.id, newCart)
      queryClient.invalidateQueries(['cart', userInfos.id], { products: newCart });
      Cookies.set('cartBackup', JSON.stringify(newCart));
    } catch (error) {
      throw error;
    }
  }, [userCart, userInfos?.id, queryClient]);

  const updateCount = (productId, action) => {
    setUserCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newCount = Math.max(
            1,
            action === 'increment' ? item.count + 1 : item.count - 1
          );
          return {...item, count: newCount};
        }
        return item;
      });
    });
    updatedCart(userInfos.id, newCart);
  };


  // اعمال کوپن
  const applyCoupon = async (code) => {
    try {
      const response = await fetch(`http://localhost:4000/coupons?code=${code}&userId=${userInfos.id}`);
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('کوپن نامعتبر');
      }

      const coupon = data[0];
      if (new Date(coupon.expiry) > new Date()) {
        setDiscount(coupon.discount);
        swal({
          title: "تخفیف اعمال شد!",
          text: `${coupon.discount}% تخفیف با موفقیت اعمال شد `,
          icon: "success",
          button: "باشه"
        });
      } else {
        swal({
          title: "خطا!",
          text: "کوپن منقضی شده است",
          icon: "error",
          button: "باشه"
        });
      }
    } catch (error) {
      swal({
        title: "خطا!",
        text: error.message,
        icon: "error",
        button: "باشه"
      });
    }
  };

  const { data: allReviews } = useGetData(['allReviews'],
    () => fetch('http://localhost:4000/reviews')
      .then(res => res.json())
  );

  const router = useRoutes(routes);

  return (
    <containerContext.Provider value={{
      filteredProducts,
      userCart,
      setUserCart,
      setFilteredProducts,
      cartItems,
      setCartItems,
      addToCart,
      removeProduct,
      isLoggedIn,
      token,
      setToken,
      userInfos,
      setUserInfos,
      login,
      user,
      logout,
      updateCount,
      theme,
      setTheme,
      datas,
      setDatas,
      cartTotal,
      discount,
      setDiscount,
      applyCoupon,
      coupons,
      setCoupons,
      allReviews: allReviews || []
    }}>
      {router}
      <Toaster />
    </containerContext.Provider>
  )
}

export default App;
