import React from 'react'
import { useParams } from 'react-router-dom'
import Shopgrid from '@/components/Shopgrid/Shopgrid';
import Shoppingcart from '@/components/Shoppingcart/Shoppingcart';
import Shopdetails from '@/components/shopdetails/Shopdetails';
import Checkout from '@/components/Checkout/Checkout';
import Myaccount from '@/components/myaccount/Myaccount';

const Store = () => {
    const { type } = useParams();
    if (type === 'Shopgrid') {
        return <Shopgrid />;
    } else if (type === 'Shoppingcart') {
        return <Shoppingcart />;
    } else if (type === 'Shopdetails') {
        return <Shopdetails />;
    } else if (type === 'Checkout') {
        return <Checkout />;
    } else if (type === 'Myaccount') {
        return <Myaccount />;
    } else {
        return <div>Not Found</div>
    }
};

export default Store;