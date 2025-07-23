import React, { useContext } from 'react';
import { useGetData } from '@/hooks/UseGetData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCoupons, createCoupon } from '@/Utils/Fetchs';
import containerContext from '@/Context/containerContext';
import { useToast } from '@/hooks/use-toast';

export default function Discounts() {
    const contextData = useContext(containerContext);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    // دریافت لیست کوپن‌ها
    const {
        data: coupons,
        isLoading,
        error
    } = useGetData(
        ['coupons', contextData.userInfos?.id],
        () => getCoupons(contextData.userInfos?.id),
        {
            enabled: !!contextData.userInfos?.id,
            onError: (error) => {
                toast({
                    description: ` خطا در دریافت کوپن‌ها: ${error.message}`,
                    variant: "destructive"
                });
            }
        }
    );

    // ایجاد کوپن جدید
    const createCouponMutation = useMutation({
        mutationFn: (newCoupon) => createCoupon(newCoupon),
        onSuccess: () => {
            queryClient.invalidateQueries(['coupons', contextData.userInfos.id]);
            contextData.setCoupons([...contextData.coupons, newCoupon]);
            toast({ description: "✅ کوپن جدید با موفقیت ایجاد شد" });
        },
        onError: (error) => {
            toast({
                description: `❌ خطا در ایجاد کوپن: ${error.message}`,
                variant: "destructive"
            });
        }
    });

    if (error) return <div className="text-red-500 text-center py-4">خطا در بارگیری داده‌ها</div>;

    return (
        <>
            <div className='p-8'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className="text-2xl font-bold">کدهای تخفیف شما</h2>

                    {contextData.userInfos?.role === 'admin' && (
                        <button
                            onClick={() => createCouponMutation.mutate({
                                code: `DISCOUNT${Math.floor(Math.random() * 1000)}`,
                                discount: 15,
                                expiry: "2025-12-31",
                                description: "تخفیف ویژه",
                                userId: contextData.userInfos.id
                            })}
                            className="bg-orange-250 px-4 py-2 rounded hover:bg-orange-300 transition disabled:opacity-50"
                            disabled={createCouponMutation.isLoading}
                        >
                            {createCouponMutation.isLoading ? 'در حال ایجاد...' : 'ایجاد کوپن جدید'}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coupons?.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-400 py-4">
                            هیچ کوپنی یافت نشد
                        </div>
                    ) : coupons?.map(coupon => (
                        <div
                            key={coupon.id}
                            className='bg-[#151B20] p-6 rounded-lg transition-all hover:shadow-lg'
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">{coupon.code}</h3>
                                <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded text-sm">
                                    {coupon.discount}% تخفیف
                                </span>
                            </div>

                            <p className="text-gray-400 mb-4">{coupon.description}</p>

                            <div className="flex justify-between items-center text-sm">
                                <span className='text-gray-400'>
                                    انقضا: {new Date(coupon.expiry).toLocaleDateString('fa-IR')}
                                </span>

                                <button
                                    onClick={() => contextData.applyCoupon.mutate(coupon.code)}
                                    className="bg-orange-250 px-4 py-2 rounded hover:bg-orange-300 transition disabled:opacity-50"
                                    disabled={contextData.applyCoupon.isLoading}
                                >
                                    {contextData.applyCoupon.isLoading ? 'در حال اعمال...' : 'اعمال'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}
