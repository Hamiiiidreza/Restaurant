import React from 'react'
import { useParams } from 'react-router-dom'
import Services from '../../components/Services/Services'
import Servicedetails from '../../components/Servicedetails/Servicedetails'
import Portfolio from '@/components/Portfolio/Portfolio'
import Portfoliodetails from '@/components/Portfoliodetails/Portfoliodetails'
import Bookatable from '@/components/Bookatable/Bookatable'

const Plate = () => {
    const { type } = useParams();
    console.log(type);
    if (type === 'Services') {
        return <Services />;
    } else if (type === 'Servicedetails') {
        return <Servicedetails />;
    } else if (type === 'Portfolio') {
        return <Portfolio />;
    } else if (type === 'Portfoliodetails') {
        return <Portfoliodetails />;
    } else if (type === 'Bookatable') {
        return <Bookatable />
    } else {
        return <div>Not Found</div>
    }
};

    export default Plate;
