import Cookies from "js-cookie";

export async function getProducts() {
  const accessToken = Cookies.get("AccessToken");
  const res = await fetch('http://localhost:4000/products')
  return res.json();
};

export async function addToCart(product) {
  const res = await fetch('http://localhost:4000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product),
  });
  return res.json();
};

export async function getCart() {
  const res = await fetch('http://localhost:4000/cart');
  return res.json();
};

export async function deleteProductFromCart(userId, productId) {
  try {
    // دریافت سبد خرید کاربر
    const cartRes = await fetch(`http://localhost:4000/cart/${userId}`);
    if (!cartRes.ok) throw new Error('سبد خرید پیدا نشد');

    const cart = await cartRes.json();

    // فیلتر کردن محصول مورد نظر
    const updatedProducts = cart.products.filter(p => p.id !== productId);

    // آپدیت سبد خرید
    const updatedRes = await fetch(`http://localhost:4000/cart/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...cart,
        products: updatedProducts
      })
    });

    if (!updatedRes.ok) throw new Error('آپدیت سبد خرید ناموفق بود');
    return await updatedRes.json();
  } catch (error) {
    console.error('خطا در حذف محصول:', error);
    throw error;
  }
};

export async function getUsers() {
  const res = await fetch('http://localhost:4000/users');
  return res.json();
};

export async function getUserByEmail(email) {
  const res = await fetch(`http://localhost:4000/users?email=${email}`);
  return res.json();
};

export async function createUser(userData) {
  const res = await fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return res.json();
};

export async function getCartByUserId(userId) {
  const res = await fetch(`http://localhost:4000/cart/${userId}`);
  if (!res.ok) return { products: [] }; // اگر سبد خرید وجود نداشت
  return res.json();
};

export async function updatedCart(userId, cartData) {
  try {
    // بررسی وجود سبد خرید

    const checkRes = await fetch(`http://localhost:4000/cart/${userId}`);

    if (!checkRes.ok) {
      // ایجاد کنیم POST اگر وجود نداشت با 
      const createRes = await fetch(`http://localhost:4000/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          userId,
          products: cartData
        })
      });

      if (!createRes.ok) throw new Error('Failed to create cart');
      return await createRes.json();
    } else {
      // آپدیت کنیم PUT اگر وجود داشت با
      const updateRes = await fetch(`http://localhost:4000/cart/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          userId,
          products: cartData
        })
      });

      if (!updateRes.ok) throw new Error('faid to update cart');
      return await updateRes.json();
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export async function updateUserTheme(userId, theme) {
  const res = await fetch(`http://localhost:4000/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme })
  });
  return res.json();
};

export async function createOrder(orderData) {
  const res = await fetch('http://localhost:4000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return res.json();
};

export async function getOrders(userId) {
  const res = await fetch(`http://localhost:4000/orders?userId=${userId}`);
  return res.json();
};

export async function createCoupon(couponData) {
  const res = await fetch('http://localhost:4000/coupons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...couponData,
      userId: couponData.userId,
      id: couponData.code // استفاده از کد به عنوان ID
    })
  });
  if (!res.ok) throw new Error('خطا در ایجاد کوپن');
  return res.json();
};

export async function getCoupons(userId) {
  const res = await fetch(`http://localhost:4000/coupons?userId=${userId}`);
  if (!res.ok) throw new Error('خطا در دیافت کوپن ها');
  return res.json();
};

export async function addReview(reviewData) {
  const res = await fetch('http://localhost:4000/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...reviewData,
      date: new Date().toISOString()
    })
  });
  return res.json();
};

export const getReviews = async (productId) => {
  try {
    const res = await fetch(`http://localhost:4000/reviews?productId=${productId}&_sort=date&_order=desc`);
    if (!res.ok) throw new Error('خطا در دریافت نظرات');
    return res.json();
  } catch (error) {
    return [];
  }
};

export const getUserReviews = async (userId) => {
  try {
    const res = await fetch(`http://localhost:4000/reviews?userId=${userId}`);
    if (!res.ok) throw new Error('خطا در دریافت نظرات');
    return res.json();
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return [];
  }
};

export async function addCoupon(code) {
  const res = await fetch('http://localhost:4000/apply-coupon', {
    method: 'POST',
    body: JSON.stringify({ code })
  });
};

export const updateUser = async (userId, data) => {
  const response = await fetch(`http://localhost:4000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'خطا در بروز رسانی اطلاعات')
  }
  return response.json()
}

export async function createReservation(reservationData) {
  const res = await fetch('http://localhost:4000/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservationData)
  })
  return res.json()
};

export async function getReservationsByUser(userId) {
  const res = await fetch(`http://localhost:4000/reservations?userId=${userId}&_sort=date&_order=desc`)
  return res.json()
};