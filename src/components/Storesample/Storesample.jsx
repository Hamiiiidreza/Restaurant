import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaPlus, FaMinus, FaChevronDown } from "react-icons/fa6";
import AddToCartButton from '../Products/AddToCartButton';
import containerContext from '@/Context/containerContext';
import { useToast } from '@/hooks/use-toast';
import { getProducts, getReviews, addReview } from '@/Utils/Fetchs';
import { useGetData } from '@/hooks/UseGetData';
import Socials from '../Socials/Socials';
import { Loader2 } from 'lucide-react';
import ReactStars from 'react-rating-stars-component';
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import swal from 'sweetalert';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Storesample() {

    const { productId } = useParams();
    const { data: products = [] } = useGetData(['products'], getProducts);
    const { data: reviews = [] } = useGetData(['reviews', productId], () => getReviews(productId));
    const [activeTab, setActiveTab] = useState('شرح');
    const contextData = useContext(containerContext);
    const [count, setCount] = useState(1);
    const [rating, setRating] = useState(0);
    const [displayCount, setDisplayCount] = useState(5);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const product = products?.find(p => p.id === (productId));

    const productInCart = contextData.userCart?.find(item => item.id === product?.id);
    const productCount = productInCart?.count || 0;

    const reviewSchema = yup.object().shape({
        comment: yup.string()
            .required('🔴 لطفاً نظر خود را وارد کنید')
            .min(10, '🔴 حداقل ۱۰ کاراکتر وارد کنید')
            .max(1000, '🔴 حداکثر ۱۰۰۰ کاراکتر مجاز است')
            .test(
                'no-spam',
                '🔴 استفاده از کاراکترها یا کلمات تکراری مجاز نیست',
                (value) => {
                    // 1. تشخیص تکرار حروف (حداقل 5 حرف یکسان پشت سر هم)
                    const repeatedCharsPattern = /(.)\1{4,}/gi; // 5 بار تکرار یا بیشتر
                    if (repeatedCharsPattern.test(value)) return false;

                    // 2. تشخیص تکرار کلمات (حداقل 3 کلمه یکسان پشت سر هم)
                    const repeatedWordPattern = /(\b\w+\b)(\s+\1){2,}/gi;
                    if (repeatedWordPattern.test(value)) return false;

                    // 3. تشخیص تنوع کلمات (حداقل 40% کلمات منحصر به فرد)
                    const words = value.split(/\s+/).filter(w => w.length > 0);
                    const uniqueWords = new Set(words);
                    return (uniqueWords.size / words.length) >= 0.4;
                }
            )
    });


    // فرم نظرات
    const { register, handleSubmit, reset, formState: { errors, isDirty }, setValue, } = useForm({
        mode: 'onChange',
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            comment: ''
        }
    });

    useEffect(() => {
        if (contextData.userInfos) {
            setValue('name', contextData.userInfos.username);
            setValue('email', contextData.userInfos.email);
        } else {
            reset({ name: '', email: '' });
        }
    }, [contextData.userInfos, setValue, reset]);


    const onSubmit = (data) => {

        reviewmutation.mutate({
            ...data,
            rating,
            productId,
            userId: contextData.userInfos?.id || null,
            guestInfo: contextData.userInfos ? null : {
                name: data.name,
                email: data.email
            }
        });
    };

    // ارسال نظر
    const reviewmutation = useMutation({
        mutationFn: async (data) => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response = addReview({
                productId,
                rating: data.rating,
                comment: data.comment,
                userId: contextData.userInfos?.id || null,
                username: contextData.userInfos?.username || null,
                guestInfo: contextData.userInfos ? null : {
                    name: data.name,
                    email: data.email
                },
                date: new Date().toISOString()
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews', productId]);
            toast({ description: 'نظر شما با موفقیت ثبت شد' });
            reset();
            setRating(0);
            if (contextData.userInfos) {
                setValue('name', contextData.userInfos.username);
                setValue('email', contextData.userInfos.email);
            }
        }
    });

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        setDisplayCount(prev => prev + 5);
        setIsLoadingMore(false);
    };

    const handleChangeCount = (action) => {
        const productInCart = contextData.userCart?.find(item => item.id === product.id);

        if (!productInCart) {
            swal({
                title: 'خطا!',
                text: 'لطفا ابتدا محصول را به سبد خرید اضافه کنید',
                icon: 'warning',
                button: 'باشه'
            });
            return;
        }

        contextData.updateCount(product.id, action);
    };

    if (!product) return <div>Loading...</div>


    return (
        <div className='storesample py-[130px]'>
            <div>
                <div className="container">
                    <div className="storesample-wrap flex items-center justify-center w-full pb-[100px] h-screen">
                        <div className="storessample-right w-[50%] pl-3 h-full">
                            <div className="singleshop-img rounded-[10px] overflow-hidden w-full h-full">
                                <img
                                    className='overflow-hidden rounded-[10px] w-full h-full object-cover'
                                    src={product.imgUrl} alt="" />
                            </div>
                        </div>
                        <div className="storessample-left w-[50%] px-3">
                            <div>
                                <div className="singleshop-details">
                                    <h2 className='text-white text-[32px] font-bold mb-5'>
                                        {product.title}
                                    </h2>
                                    <div className='flex items-center gap-1'>
                                        <ReactStars
                                            count={5}
                                            value={reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0}
                                            size={24}
                                            activeColor="#FFBB0B"
                                            edit={false}
                                            isHalf={true}
                                            precision={0.5}
                                            emptyIcon={<IoMdStarOutline />}
                                            halfIcon={<IoMdStarHalf />}
                                            filledIcon={<IoMdStar />}
                                            key={reviews.length} // برای رندر مجدد
                                        />
                                        <span className='font-bold'>({reviews.length}بررسی)</span>
                                    </div>
                                    <h4 className='text-2xl text-orange-250 font-bold mt-[22px] mb-[13px]'>
                                        {product.price.toLocaleString()} تومان
                                        {product.oldPrice && (
                                            <span className='text-lg text-[#D2D2D2] line-through'>
                                                - {product.oldPrice.toLocaleString()}    تومان
                                            </span>
                                        )}
                                    </h4>
                                    <p className='font-bold border-b border-solid border-white border-opacity-15 pb-[35px] mb-[34px]'>حقیقت، استاد ساز سعادت بشر. هیچ کس خود لذت را رد نمی کند، دوست ندارد یا از آن اجتناب نمی کند، زیرا لذت است، بلکه به این دلیل است</p>
                                    <div className='flex items-center gap-4 mb-6 flex-nowrap'>
                                        <div className='relative flex items-center justify-center w-[136px] h-10 bg-transparent rounded-[3px] border border-solid border-white border-opacity-15'>
                                            <button
                                                className='absolute right-0 text-lg p-0 z-10 w-[45px] h-10  border-l border-solid border-white border-opacity-15'
                                                onClick={() => handleChangeCount('decrement')}
                                            >
                                                <FaMinus className='absolute right-[13px] bottom-[11px] text-base' />
                                            </button>
                                            <input
                                                className='border-none bg-transparent h-10 text-base text-center outline-none w-full py-3 px-[45px]'
                                                type='text'
                                                value={productCount}
                                                readOnly
                                            />
                                            <button
                                                className='absolute left-0 text-lg p-0 z-10 w-[45px] h-10  border-r border-solid border-white border-opacity-15'
                                                onClick={() => handleChangeCount('increment')}
                                            >
                                                <FaPlus className='absolute left-[13px] bottom-[11px] text-base' />
                                            </button>
                                        </div>
                                        <div className='flex-grow'>
                                            <AddToCartButton
                                                product={{ ...product, count }}
                                                className='w-full h-10 rounded-[3px]'
                                            />
                                        </div>
                                    </div>
                                    <ul className='mb-[30px]'>
                                        <li className="mb-[10px] font-bold">
                                            <span className="text-white font-bold mr-2">SKU:</span>
                                            N/A
                                        </li>
                                        <li className="mb-[10px] font-bold">
                                            <span className="text-white font-bold mr-2">دسته بندی:</span>
                                            غذاهای اصلی
                                        </li>
                                        <li className="mb-[10px] font-bold">
                                            <span className="text-white font-bold mr-2">برچسب ها:</span>
                                            <Link
                                                to="/Store/Shopgrid"
                                                className='relative text-white font-semibold mr-1 after:absolute after:content-[""] after:bottom-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:ease-in-out after:duration-500 after:hover:w-full'
                                            >
                                                غذا
                                            </Link>
                                            ،
                                            <Link
                                                to="/Store/Shopgrid"
                                                className='relative text-white font-semibold mr-1 after:absolute after:content-[""] after:bottom-[-3px] after:right-0 after:w-0 after:h-[1px] after:bg-white after:transition-all after:ease-in-out after:duration-500 after:hover:w-full'
                                            >
                                                رستوران
                                            </Link>
                                        </li>
                                        <li className="font-bold">
                                            <span className="text-white font-bold mr-2">شناسه محصول:</span>
                                            2398
                                        </li>
                                    </ul>
                                    <div>
                                        <span className="text-white text-[18px] font-bold ml-[6px]">اشتراک : </span>
                                        <Socials />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className='flex mb-[30px]'>
                        {['شرح', 'اطلاعات تکمیلی', 'نظرات'].map((title) => (
                            <li className="ml-[22px]" key={title}>
                                <button
                                    onClick={() => setActiveTab(title)}
                                    className={`text-[22px] text-white font-bold py-[17px] px-7 bg-[#151B20] rounded-[5px] border-none transition-colors
                                         ${activeTab === title ? 'bg-orange-250' : 'bg-[#151B20] hover:bg-orange-250'}`}
                                >
                                    {title}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className='tab-content'>
                        {activeTab === 'شرح' && (
                            <div className="product-desc">
                                <p>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                                </p>
                            </div>
                        )}

                        {activeTab === 'اطلاعات تکمیلی' && (
                            <div className="wrap">
                                <div className="w-1/2">
                                    <div className="mb-[25px] border border-solid border-white border-opacity-15 rounded-lg overflow-hidden">
                                        <div className="bill-item-wrap">
                                            {product?.specs.map((spec, i) => (
                                                <div key={i} className={`bill-item ${i % 2 === 0 ? 'bg-[#151B20]' : ''} relative flex items-center justify-between flex-wrap py-[17px] px-[30px] after:absolute after:content-[''] after:top-0 after:right-1/2 after:w-[1px] after:h-full after:translate-x-1/2 after:bg-white after:bg-opacity-15`}>
                                                    <p className="bill-item-name w-1/2 text-[18px] font-bold">{spec.name}</p>
                                                    <span className="bill-item-price w-1/2 text-[18px] font-bold text-center">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'نظرات' && (
                            <div className="flex justify-between wrap">
                                <div className="w-1/2 pl-3">
                                    <div className="mb-[45px]">
                                        <h5 className='text-white text-[26px] mb-[25px] font-bold'>
                                            {reviews?.length || 0} نظر
                                        </h5>

                                        {reviews.length === 0 ? (
                                            <p className='text-white/70'>هنوز نظری ثبت نشده است.</p>
                                        ) : (
                                            <>
                                                {reviews.slice(0, displayCount).map((review, index) => (
                                                    <div key={review.id} className="flex flex-wrap mb-[25px]">
                                                        <div className='w-[58px] h-[58px] rounded-[50%]'>
                                                            <img
                                                                src={
                                                                    review.userId
                                                                        ? contextData.userInfos?.avatar || "/Img/author-1.webp"
                                                                        : "/Img/guest.png"
                                                                }
                                                                alt=""
                                                                className='w-full rounded-[50%]'
                                                            />
                                                        </div>
                                                        <div
                                                            className={`mr-[15px] w-[calc(100%_-_73px)] pb-[25px] ${index !== reviews.length - 1 ?
                                                                'border-b border-solid border-white border-opacity-15' : ''
                                                                }`}
                                                        >
                                                            <div className="items-start">
                                                                <div className="px-3 ml-[52px] mb-5">
                                                                    <h5 className='text-white font-bold'>
                                                                        {review.username || (review.guestInfo?.name
                                                                            ? `${review.guestInfo.name}(مهمان)` : 'مهمان'
                                                                        )}
                                                                    </h5>
                                                                    <span className="text-sm mt-[7px]">
                                                                        {new Date(review.date).toLocaleString('fa-IR')}
                                                                    </span>
                                                                </div>
                                                                <div className="px-3 ml-[52px]">
                                                                    <div className="flex text-xl gap-1 text-yellow-400">
                                                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                                    </div>
                                                                </div>
                                                                <div className="px-3">
                                                                    <p className='flex text-sm font-bold max-w-[500px] line-clamp-2 overflow-hidden'>
                                                                        “{review.comment}”
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {reviews.length > displayCount && (
                                                    <div className="w-full flex justify-center mt-6">
                                                        <button
                                                            onClick={handleLoadMore}
                                                            disabled={isLoadingMore}
                                                            className="flex items-center gap-2 border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none duration-[0.s] px-6 py-3 rounded-lg disabled:opacity-50 transition-colors"
                                                        >
                                                            {isLoadingMore ? (
                                                                <>
                                                                    <Loader2 className='animate-spin h-5 w-5' />
                                                                    در حال بارگیری...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    مشاهده بیشتر
                                                                    <FaChevronDown className='text-sm mt-1' />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2 pr-3">
                                    <div className="client-review-form">
                                        <div className="">
                                            <h4 className="text-white text-lg font-bold mb-2">
                                                یک بررسی اضافه کنید
                                            </h4>
                                            <p className="text-sm font-semibold mb-4">
                                                آدرس ایمیل شما منتشر نخواهد شد. فیلدهای الزامی مشخص شده اند *
                                            </p>
                                        </div>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="mt-6">
                                            <div className='flex flex-wrap'>
                                                <div className=" flex items-center gap-5 w-full px-3 mb-[15px]">
                                                    <label>امتیاز شما</label>
                                                    <ReactStars
                                                        count={5}
                                                        value={rating}
                                                        size={24}
                                                        activeColor="#FFBB0B"
                                                        onChange={(newValue) => setRating(newValue)}
                                                        isHalf={false}
                                                        key={rating}
                                                    />
                                                </div>
                                                {contextData.userInfos?.id && (
                                                    <>
                                                        <div className="w-1/2 px-3 mb-[15px]">
                                                            <label
                                                                className="block text-base text-white font-bold mb-[10px]">
                                                                نام*
                                                            </label>
                                                            <input
                                                                type="text"
                                                                {...register('name')}
                                                                readOnly={!contextData.userInfos}
                                                                className={`bg-[#151B20] rounded-[5px] h-[52px] text-white w-full outline-none py-3 px-[15px]
                                                                ${contextData.userInfos?.id ? 'opacity-50 cursor-not-allowed' : ''

                                                                    }`}
                                                            />
                                                        </div>
                                                        <div className="w-1/2 px-3 mb-[15px]">
                                                            <label
                                                                className="block text-base text-white font-bold mb-[10px]">
                                                                ایمیل*
                                                            </label>
                                                            <input
                                                                type="email"
                                                                {...register('email')}
                                                                readOnly={!contextData.userInfos}
                                                                className={`bg-[#151B20] rounded-[5px] h-[52px] text-white w-full outline-none py-3 px-[15px]
                                                                ${contextData.userInfos?.id ? 'opacity-50 cursor-not-allowed' : ''
                                                                    }`}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <div className="w-full px-3 mb-[15px]">
                                                    <label
                                                        className="block text-base text-white font-bold mb-[10px]">
                                                        نظر شما
                                                    </label>
                                                    <textarea
                                                        {...register('comment')}
                                                        className='bg-[#151B20] rounded-[5px] resize-none text-white text-base h-[160px] w-full outline-none py-3 px-[15px]'
                                                    />
                                                    {errors.comment && <span className='text-red-500 text-sm'>{errors.comment.message}</span>}
                                                </div>
                                                <div className="w-full px-3 mt-[10px]">
                                                    <button
                                                        type='submit'
                                                        disabled={reviewmutation.isPending || !isDirty}
                                                        className='btn relative text-white font-bold bg-orange-250 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] py-[15px] px-[32px] z-10 leading-none overflow-hidden rounded-[50px] transition-all ease-in'
                                                    >
                                                        {reviewmutation.isPending ? (
                                                            <span className="flex items-center gap-2">
                                                                <Loader2 className='animate-spin h-5 w-5' />
                                                                در حال ثبت...
                                                            </span>
                                                        ) : (
                                                            'تایید'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}
