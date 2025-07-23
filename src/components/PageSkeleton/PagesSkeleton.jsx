import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    DashboardSkeleton, OrdersSkeleton, NewOrderSkeleton, ReviewsSkeleton, ReservationsSkeleton,
    DiscountsSkeleton, SettingsSkeleton, ReservationCartSkeleton, ReservationCheckoutSkeleton
} from './PageSkeleton';

export default function PagesSkeleton() {
    const location = useLocation();

    switch (location.pathname) {
        case '/my-account/':
            return <DashboardSkeleton />;
        case '/my-account/orders':
            return <OrdersSkeleton />;
        case '/my-account/new-order':
            return <NewOrderSkeleton />;
        case '/my-account/reviews':
            return <ReviewsSkeleton />;
        case '/my-account/table-Reservation':
            return <ReservationsSkeleton />;
        case '/my-account/discounts':
            return <DiscountsSkeleton />;
        case '/my-account/settings':
            return <SettingsSkeleton />;
        case '/my-account/ReservationCart':
            return <ReservationCartSkeleton />;
        case '/my-account/ReservationCheckout':
            return <ReservationCheckoutSkeleton />;
        default:
            return <div>Loading...</div>;
    }
}
