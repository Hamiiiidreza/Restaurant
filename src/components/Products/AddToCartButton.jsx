import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import containerContext from '@/Context/containerContext.js';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { addToCart } from '@/Utils/Fetchs';
import { getCart } from '@/Utils/Fetchs';
import { useGetData } from '@/hooks/UseGetData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartByUserId, updatedCart } from '@/Utils/Fetchs';
import swal from 'sweetalert';

const AddToCartButton = ({ opacity, product }) => {

  const contextData = useContext(containerContext);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: cart } = useGetData(['cart', contextData.userInfos?.id],
    () => {
      if (!contextData.userInfos?.id) return;
      return getCartByUserId(contextData.userInfos.id);
    },
    {
      enabled: !!contextData.isLoggedIn && !!contextData.userInfos?.id
    });

  const inCart = Array.isArray(contextData.userCart)
    ? contextData.userCart.some(item => (item?.id) === (product?.id))
    : false;

  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: "محصول مورد نظر شما با موفقیت به سبد خرید اضافه شد.",
    });
  };

  const navigate = useNavigate();

  //  useEffect(() => {
  //    const fetchCart = async () => {
  //      if (contextData.isLoggedIn) {
  //        const cartFromServer = await getCart();
  //        contextData.setUserCart(cartFromServer);
  //      }
  //    };
  //    fetchCart();
  //  }, [product.id, contextData.isLoggedIn]);

  const addToCartMutation = useMutation({
    mutationFn: () => {
      const newCart = contextData.userCart.some(item => item.id === product.id)
        ? contextData.userCart.map(item => item.id === product.id
          ? { ...item, count: (item.count || 1) + 1 }
          : item
        )
        : [...contextData.userCart, { ...product, count: 1 }];
      return updatedCart(contextData.userInfos.id, newCart);
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (updated) => {
      // همگام سازی نهایی با سرور
      contextData.setUserCart(updated.products);
    },
    onError: (error) => {
      swal({
        title: 'خطا!',
        text: `مشکل در افزودن به سبد خرید: ${error.message}`,
        icon: 'error',
        button: 'باشه'
      });
      // بازگرداندن حالت قبلی در صورت خطا
      contextData.setUserCart(prev => {
        const currentCart = Array.isArray(prev) ? prev : [];
        return currentCart.filter(item => item.id !== product.id);
      })
    },
    onSettled: () => {
      setTimeout(() => {
        setLoading(false);
        showToast();
      }, 2000);
      clearTimeout();
    }
  });

  const handleClick = async () => {

    if (!contextData.isLoggedIn || !contextData.userInfos?.id) {
      swal({
        title: "نیاز به احراز هویت",
        text: "برای افزودن محصول به سبد خرید باید وارد شوید",
        icon: "warning",
        buttons: ["بعدا", "ورود"]
      }).then((confirm) => {
        if (confirm) navigate('/Store/Myaccount');
      });
      return;
    }
    addToCartMutation.mutate();
  };
  //    setLoading(true);
  //    await addToCart(product);
  //    const freshCart = await getCart();
  //    contextData.setUserCart(freshCart);
  //    const updatedCart = contextData.userCart.map(item =>
  //      String(item.id) === String(product.id)
  //        ? { ...item, count: item.count + 1 }
  //        : item
  //    );
  //
  //    if (!updatedCart.some(item => String(item.id) === String(product.id))) {
  //      updatedCart.push({ ...product, count: 1 });
  //    }
  //
  //    contextData.setUserCart(updatedCart);
  //
  //  } catch (error) {
  //    console.error("خطا در افزودن به سبد خرید:", error);
  //  } finally {
  //    setTimeout(() => {
  //      setLoading(false);
  //      showToast();
  //    }, 2000);
  //    clearTimeout();
  //  }


  const handleViewCart = () => {
    navigate('/Store/Shoppingcart', { replace: true });
  };


  return (
    <div>
      <button
        onClick={!inCart ? handleClick : handleViewCart}
        disabled={loading}
        className={`absolute flex items-center justify-center whitespace-nowrap text-center top-[53%] right-[50%] transition-all duration-300 ease-in delay-200 text-white font-bold bg-orange-250 py-[15px] px-8 translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-[50px] ${opacity} leading-none group-hover:opacity-100 group-hover:top-[50%] before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-0 before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-200 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] ${loading ? 'pointer-events-none' : ''}`}
      >
        {loading ? (
          <div className='flex items-center justify-between gap-2'> {/* py:... px:...*/}
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className='whitespace-nowrap'>در حال افزودن...</span>
          </div>
        ) : inCart ? (
          'مشاهده سبد خرید'
        ) : (
          'افزودن به سبد خرید'
        )}
      </button>
    </div>
  )
};


export default AddToCartButton;

