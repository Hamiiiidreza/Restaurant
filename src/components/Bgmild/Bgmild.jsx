import React from 'react'
import Bgmildcard from './Bgmildcard'

export default function Bgmild() {

const features = [
  {id:1, name:'تازه ترین ماهی', imgUrl:'https://rtlme.ir/Etar/assets/img/icons/fish.svg'},
  {id:2, name:'خاویار طبیعی', imgUrl:'https://rtlme.ir/Etar/assets/img/icons/caviar.svg'},
  {id:3, name:'بهترین میگو ها', imgUrl:'https://rtlme.ir/Etar/assets/img/icons/lobstar.svg'},
  {id:4, name:'صدف های عالی"', imgUrl:'https://rtlme.ir/Etar/assets/img/icons/mussels.svg'},
]

  return (
    <div className='bgmild pt-[130px] pb-[100px] bg-[#151B20] leading-[26px]'>
        <div className='container'>
            <div className='feature-card_wrap flex items-center justify-center'>
                <Bgmildcard {...features[0]} />
                <Bgmildcard {...features[1]} />
                <Bgmildcard {...features[2]} />
                <Bgmildcard {...features[3]} />
            </div>
        </div>
    </div>
  )
}
