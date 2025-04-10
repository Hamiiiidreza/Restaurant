import React, { createContext } from 'react'


const containerContext = createContext({
    isLoggedIn: false,
    token: null,
    userInfos: null,
    setUserInfos: null,
    login: () => { },
    logout: () => { },
    filteredProducts: null,
    userCart: [],
    setUserCart: () => { },
    setFilteredProducts: null,
    cartItems: 0,
    setCartItems: () => { },
    addToCart: () => { },
    removeProduct: () => { },
    updateCount: null,
    theme: null,
    setTheme: null,
    datas: null,
    setDatas: null,
    cartTotal: null,
    discount: null,
    setDiscount: null,
    coupons: null,
    setCoupons: null,
    applyCoupon: () => { },
    allReviews: null,
});

export default containerContext;
