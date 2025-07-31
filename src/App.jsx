import { useState, useCallback, useEffect, useRef } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import routes from './routes';
import './App.css';
import { useQueryClient } from '@tanstack/react-query';
import { getProducts, getUsers, getCartByUserId, updatedCart, getTables, getReservationsByUser } from './Utils/Fetchs';
import { useGetData } from './hooks/UseGetData';
import containerContext from './Context/containerContext.js';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { DateObject } from 'react-multi-date-picker';
import { useToast } from './hooks/use-toast';
import { ToastAction } from './components/ui/toast';
import { useCookies } from 'react-cookie';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader/Loader';

function App() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();


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
  const [availableTables, setAvailableTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reservationData, setReservationData] = useState({
    guests: 2,
    cart: [],
    dateTime: null,
    tables: [],
    menuItems: [],
    reservedDates: []
  });
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // افزودن بررسی مسیر برای تعیین لودر
  const isUserPanel = location.pathname.startsWith('/my-account');

  // تابع برای شروع نمایش اسکلتون
  const startSkeleton = useCallback(() => {
    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
  }, []);


  useEffect(() => {
    // ریست ScrollTrigger هنگام تغییر مسیر
    ScrollTrigger.refresh();

    // پاکسازی انیمیشن‌های قبلی
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf(window);
    };
  }, [location.pathname]);

  useEffect(() => {
    // حالت لودینگ را فعال کن
    setIsLoading(true);

    // مدت زمان نمایش لودر: 1 ثانیه
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);


  useEffect(() => {
    const loadTables = async () => {
      const data = await getTables();
      setAvailableTables(data);
    };
    loadTables();
  }, []);

  // دریافت رزروهای نهایی کاربر
  const loadUserReservations = useCallback(async (userId) => {
    try {
      const confirmedReservations = await getReservationsByUser(userId);

      // تبدیل تاریخ‌ها به فرمت شمسی YYYY-MM-DD
      const persianDates = confirmedReservations.map(reservation => {
        const date = new Date(reservation.date);
        return new DateObject({ date, calendar: persian })
          .convert(persian, persian_fa)
          .format("YYYY-MM-DD");
      });

      const uniqueDates = [...new Set(persianDates)].sort();

      setReservationData(prev => ({
        ...prev,
        reservedDates: uniqueDates,
      }));
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  }, []);

  // تابع برای بارگیری داده‌های رزرواسیون از کوکی
  const loadReservationDataFromCookie = useCallback(() => {
    if (userInfos?.id) {
      const savedData = Cookies.get(`reservationData_${userInfos.id}`);
      if (savedData) {
        try {
          const decodedData = decodeURIComponent(savedData);
          const parsedData = JSON.parse(decodedData);
          setReservationData(parsedData);
          return parsedData;
        } catch (error) {
          console.error('Error parsing reservation data:', error);
        }
      }
    }
    return null;
  }, [userInfos?.id]);

  const hasShowActiveReservationsRef = useRef(false);

  const showActiveReservationsNotification = useCallback(async (userId) => {
    try {
      // اگر قبلا نمایش داده شده دیگر نمایش نده
      if (hasShowActiveReservationsRef.current) return;

      console.log('Fetching reservations for user:', userId);
      const reservations = await getReservationsByUser(userId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activeReservations = reservations.filter(res => {
        const resDate = new Date(res.date);
        return resDate >= today;
      });

      console.log('Active reservations:', activeReservations);

      if (activeReservations.length > 0) {
        const persianDates = activeReservations.map(res =>
          new DateObject(res.date)
            .convert(persian, persian_fa)
            .format("YYYY/MM/DD")
        );

        setTimeout(() => {
          toast({
            title: 'رزروهای فعال شما',
            description: (
              <div className="flex flex-col gap-2">
                <ul className="list-disc pr-4">
                  {persianDates.map((date, i) => (
                    <li key={i}>{date}</li>
                  ))}
                </ul>
              </div>
            ),
            variant: 'info',
            action: (
              <ToastAction
                altText="مشاهده رزروها"
                onClick={() => navigate('/my-account/table-Reservation')}
              >
                مشاهده
              </ToastAction>
            )
          });

          // علامت گذاری که توست نمایش داده شده
          hasShowActiveReservationsRef.current = true;
        }, 3000);
      } else {
        console.log('No active reservations');
      }
    } catch (error) {
      console.error('خطا در دریافت رزروها:', error);
    }
  }, [navigate, toast]);

  const login = useCallback(async (userData, token) => {
    // پاک سازی سبد خرید قبلی هنگام لاگین
    setUserCart([]);
    setUserInfos({});
    setToken(null);
    setReservationData({
      guests: 2,
      cart: [],
      dateTime: null,
      tables: [],
      menuItems: [],
      reservedDates: []
    });
    Cookies.remove('cartBackup');

    // دریافت سبد خرید از سرور
    const cart = await getCartByUserId(userData.id);
    setUserCart(cart.products || []);

    // دریافت رزروها از سرور 
    await loadUserReservations(userData.id);
    await showActiveReservationsNotification(userData.id);

    // بارگذاری سبد رزرو از کوکی مخصوص کاربران فعلی
    const savedReservation = Cookies.get(`reservationData_${userData.id}`);
    if (savedReservation) {
      try {
        const parsedData = JSON.parse(savedReservation);
        setReservationData(parsedData);
      } catch (error) {
        console.error('Enter parsing reservation data:', error);
      }
    };

    // پاک‌سازی تغییرات موقت قبلی
    Cookies.remove(`reservation_temp_${userData.id}`, { path: '/' });


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
  }, [queryClient, navigate, userInfos?.id, loadUserReservations, showActiveReservationsNotification]);

  const logout = useCallback(async () => {

    setToken(null);
    setUserInfos({});
    setIsLoggedIn(false);
    setUserCart([]);
    setReservationData({
      guests: 2,
      cart: [],
      dateTime: null,
      tables: [],
      menuItems: [],
      reservedDates: []
    });

    // پاک سازی فقط کوکی های کاربر فعلی
    if (userInfos?.id) {
      Cookies.remove(`reservationData_${userInfos.id}`, { path: '/' });
      Cookies.remove(`reservation_temp_${userInfos.id}`, { path: '/' });
    };

    Cookies.remove('authToken');
    Cookies.remove('cartBackup');
    // پاک سازی کش
    queryClient.removeQueries();
  }, [queryClient, userInfos?.id]);

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

  //  بارگذاری از کوکی هنگام لود اولیه برای زمانیکه رزرو کامل انجام نشده
  useEffect(() => {
    const loadReservationData = () => {
      if (userInfos.id) {
        const savedData = Cookies.get(`reservationData_${userInfos.id}`);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setReservationData(prev => ({
              ...prev,
              ...parsedData,
              // حفظ ساختار اولیه برای فیلدهای ممکن است تعریف نشده
              cart: parsedData.cart || [],
              dateTime: parsedData.dateTime || null
            }));
          } catch (error) {
            console.error('Error parsing reservation data:', error);
          }
        }
      }
    };
    loadReservationData();
  }, [userInfos.id]); // فقط با تغییر آیدی کاربر اجرا شود

  // ذخیره در کوکی برای زمانیکه رزرو کامل انجام نشده
  useEffect(() => {
    if (userInfos.id && reservationData) {
      Cookies.set(
        `reservationData_${userInfos.id}`,
        JSON.stringify(reservationData),
        {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/'
        }
      );
    }
  }, [reservationData, userInfos.id]);




  const { data: tablesData } = useGetData(['tables'], getTables);
  useEffect(() => {
    if (tablesData) setAvailableTables(tablesData);
  }, [tablesData]);

  const { data: menuData } = useGetData(['menu'], getProducts);
  useEffect(() => {
    if (menuData) setMenuItems(menuData);
  }, [menuData]);

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

          // نمایش توست رزروهای فعال هنگام لود اولیه
          showActiveReservationsNotification(loggedInUser.id);
        }
      }
    };
    fetchUserData();
  }, [showActiveReservationsNotification]);


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
          return { ...item, count: newCount };
        }
        return item;
      });
    });
    updatedCart(userInfos.id);
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

  const removeReservation = useCallback((reservationId) => {
    setReservationData(prev => prev.filter(r => r.id !== reservationId));
  }, []);

  const updateReservation = useCallback((reservationId, productId, action) => {
    setReservationData(prev => prev?.map(reservation => {
      if (reservation.id === reservationId) {
        return {
          ...reservation,
          products: reservation.products?.map(product => {
            if (product.id === productId) {
              const newQuantity = Math.max(
                1, // حداقل مقدار 1
                action === 'increment' ? product.quantity + 1 : product.quantity - 1
              );
              return { ...product, quantity: newQuantity };
            }
            return product;
          })
        };
      }
      return reservation;
    }));
  }, []);

  const loadMenuItems = async () => {
    try {
      const res = await fetch('http://localhost:4000/products');
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error loading meni items:', error);
    }
  };

  // توابع اصلاح شده برای پشتیبانی از عملیات set و remove
  const updateTableCount = (type, action, count = null) => {
    setReservationData(prev => {
      const newCart = [...(prev.cart || [])];
      const existingIndex = newCart.findIndex(item =>
        item.category === 'table' && item.type === type
      );

      if (action === 'set' && count !== null) {
        if (existingIndex >= 0) {
          newCart[existingIndex] = { ...newCart[existingIndex], count };
        } else {
          const tableData = availableTables?.find(t => t.type === type);
          newCart.push({
            id: `table_${type}`,
            type,
            count,
            category: 'table',
            max: tableData?.max || 0,
            price: tableData?.price || 0,
            name: tableData?.name || ''
          });
        }
      }
      else if (action === 'remove') {
        if (existingIndex >= 0) {
          newCart.splice(existingIndex, 1);
        }
      }

      return { ...prev, cart: newCart };
    });
  };

  const updateFoodCount = (id, action, quantity = null) => {
    setReservationData(prev => {
      const newCart = [...(prev.cart || [])];
      const existingIndex = newCart.findIndex(item =>
        item.category === 'food' && item.id === id
      );

      if (action === 'set' && quantity !== null) {
        if (existingIndex >= 0) {
          newCart[existingIndex] = { ...newCart[existingIndex], quantity };
        } else {
          const foodData = menuItems.find(f => f.id === id);
          newCart.push({
            id: foodData.id,
            category: 'food',
            title: foodData.title,
            imgUrl: foodData.imgUrl,
            price: foodData.price,
            quantity
          });
        }
      }
      else if (action === 'remove') {
        if (existingIndex >= 0) {
          newCart.splice(existingIndex, 1);
        }
      }

      return { ...prev, cart: newCart };
    });
  };


  const calculateTotal = useCallback((items) => {
    if (!Array.isArray(items)) {
      console.error('Invalid items:', items);
      return 0;
    }
    return items.reduce((total, item) => {
      if (item.category === 'table') {
        const table = availableTables.find(t => t.type === item.type);
        return total + (table?.price || 0) * (item.count || 0);
      }
      if (item.category === 'food') {
        return total + (item.price || 0) * (item.quantity || 0);
      }
      return total;
    }, 0);
  }, [availableTables]);

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
      allReviews: allReviews || [],
      //  addReservation,
      removeReservation,
      updateReservation,
      availableTables,
      setAvailableTables,
      updateTableCount,
      updateFoodCount,
      calculateTotal,
      menuItems,
      loadMenuItems,
      reservationData,
      setReservationData,
      loadUserReservations,
      showActiveReservationsNotification,
      loadReservationDataFromCookie,
      showSkeleton,
      startSkeleton,
    }}>
      {!isUserPanel && <Loader isLoading={isLoading} />}
      {router}
    </containerContext.Provider>
  )
}

export default App;
