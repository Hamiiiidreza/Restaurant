import React from 'react';
import { Skeleton } from '../ui/skeleton';

export function DashboardSkeleton() {
    return (
        <div className='p-8'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="dark:bg-[#151B20] bg-gray-200 p-6 rounded-lg">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function OrdersSkeleton() {
    return (
        <div className='p-8'>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className='space-y-4'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className='bg-[#151B20] rounded-lg p-4'>
                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-2'>
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <div className='col-span-3'>
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className='col-span-3'>
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className='col-span-3'>
                                <Skeleton className="h-6 w-16 rounded" />
                            </div>
                            <div className='col-span-1'>
                                <Skeleton className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function NewOrderSkeleton() {
    return (
        <div className='p-8'>
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='bg-[#151B20] rounded-lg p-4'>
                        <Skeleton className="w-full h-48 rounded-lg mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ReviewsSkeleton() {
    return (
        <div className='p-8'>
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-[#151B20] p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ReservationsSkeleton() {
    return (
        <div className='p-8'>
            <div className="bg-[#151B20] p-8 rounded-lg">
                <Skeleton className="h-8 w-32 mb-6" />
                <Skeleton className="h-12 w-24 mb-8" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-blue-300/10 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-8 w-16 rounded" />
                                    <Skeleton className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function DiscountsSkeleton() {
    return (
        <div className='p-8'>
            <div className='flex justify-between items-center mb-6'>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className='bg-[#151B20] p-6 rounded-lg'>
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-16 rounded" />
                        </div>
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SettingsSkeleton() {
    return (
        <div className='p-8'>
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="max-w-lg space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
                <Skeleton className="h-12 w-32 mt-6" />
            </div>
        </div>
    );
}

export function ReservationCartSkeleton() {
    return (
        <div className='py-[100px]'>
            <div className='container px-10'>
                <div className="flex justify-center mb-8">
                    <div className="flex gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-16 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="guest-selector bg-[#1a1e24] p-6 rounded-lg mb-6">
                    <div className="flex items-end justify-between">
                        <Skeleton className="h-6 w-32" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-10 w-10 rounded" />
                        </div>
                    </div>
                </div>

                <div className="cart-items space-y-6">
                    {/* Tables Section */}
                    <div className="tables-section bg-[#1a1e24] p-6 rounded-lg">
                        <Skeleton className="h-7 w-48 mb-4" />
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="item-card bg-[#2a2e35] p-4 rounded-lg mb-4">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-5 w-64" />
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-10 w-10 rounded" />
                                            <Skeleton className="h-6 w-8" />
                                            <Skeleton className="h-10 w-10 rounded" />
                                        </div>
                                        <Skeleton className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Products Section */}
                    <div className="products-section bg-[#1a1e24] p-6 rounded-lg">
                        <Skeleton className="h-7 w-48 mb-4" />
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="item-card bg-[#2a2e35] p-4 rounded-lg mb-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="w-16 h-16 rounded" />
                                        <div>
                                            <Skeleton className="h-5 w-48 mb-2" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-10 w-10 rounded" />
                                            <Skeleton className="h-6 w-8" />
                                            <Skeleton className="h-10 w-10 rounded" />
                                        </div>
                                        <Skeleton className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Section */}
                    <div className="total-section bg-[#1a1e24] p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <Skeleton className="h-7 w-32" />
                            <Skeleton className="h-8 w-40" />
                        </div>
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ReservationCheckoutSkeleton() {
    return (
        <div className='py-[100px]'>
            <div className="container">
                <div className="flex justify-center mb-8">
                    <div className="flex gap-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-16 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#151B20] p-8 rounded-lg">
                    <Skeleton className="h-8 w-48 mb-6" />

                    <div className="reservation-summary mb-6 space-y-4">
                        {/* Date */}
                        <div className="bg-[#0E1317] p-4 rounded">
                            <Skeleton className="h-6 w-32 mb-3" />
                            <Skeleton className="h-5 w-56" />
                        </div>

                        {/* Guests */}
                        <div className="bg-[#0E1317] p-4 rounded">
                            <Skeleton className="h-6 w-32 mb-3" />
                            <Skeleton className="h-5 w-24" />
                        </div>

                        {/* Tables */}
                        <div className="bg-[#0E1317] p-4 rounded">
                            <Skeleton className="h-6 w-32 mb-3" />
                            <div className="space-y-3">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4">
                                        <Skeleton className="col-span-4 h-5" />
                                        <Skeleton className="col-span-4 h-5" />
                                        <Skeleton className="col-span-4 h-5" />
                                    </div>
                                ))}
                                <div className="grid grid-cols-12 gap-4 pt-3">
                                    <Skeleton className="col-span-4 h-5" />
                                    <Skeleton className="col-span-4 h-5" />
                                    <Skeleton className="col-span-4 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="bg-[#0E1317] p-4 rounded">
                            <Skeleton className="h-6 w-32 mb-3" />
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-4">
                                        <Skeleton className="col-span-4 h-5" />
                                        <Skeleton className="col-span-4 h-5" />
                                        <Skeleton className="col-span-4 h-5" />
                                    </div>
                                ))}
                                <div className="grid grid-cols-12 gap-4 pt-3">
                                    <Skeleton className="col-span-4 h-5" />
                                    <Skeleton className="col-span-4 h-5" />
                                    <Skeleton className="col-span-4 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-[#0E1317] p-4 rounded">
                            <div className="flex justify-between">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-6 w-40" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-8 w-full" />
                    </div>

                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}