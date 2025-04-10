import React from 'react'
import Featurecard from './Featurecard'

export default function Features({ bgColor }) {

    const features = [
        {id:1, title:'محصولات تازه', imgUrl:'../Public/Img/feature-img-1.svg'},
        {id:1, title:'آشپز های ماهر', imgUrl:'../Public/Img/feature-img-2.svg'},
        {id:1, title:'بهترین نوشیدنی ها', imgUrl:'../Public/Img/feature-img-3.svg'},
        {id:1, title:'غذا های وگان', imgUrl:'../Public/Img/feature-img-4.svg'}
    ]

    return (
        <div className={`features pt-[130px] pb-[100px] ${bgColor}`}>
            <div className='container'>
                <div className='feature-card-wrap flex justify-center flex-wrap'>
                    <Featurecard {...features[0]} />
                    <Featurecard {...features[1]} />
                    <Featurecard {...features[2]} />
                    <Featurecard {...features[3]} />
                </div>
            </div>
        </div>
    )
}
