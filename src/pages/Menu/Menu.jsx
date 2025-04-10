import React from 'react'
import { useParams } from 'react-router-dom'
import Restaurantmenu from '../../components/Restaurantmenu/Restaurantmenu'
import Coffeemenu from '../../components/Coffemenu/Coffeemenu'

const Menu = () => {
    const { type } = useParams();
    console.log(type)
    if (type === 'Restaurantmenu') {
        return <Restaurantmenu />;
    } else if (type === 'Coffeemenu') {
        return <Coffeemenu />;
    } else {
        return <div>Not Found</div>
    }

};

export default Menu;
