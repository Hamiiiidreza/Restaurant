import React from 'react'
import Countercard from './Countercard'

export default function Counter() {

  const Statistics = [
    {id:1, number:'210', name:'لحظات عالی'},
    {id:1, number:'160', name:'لحظات عالی'},
    {id:1, number:'470', name:'فنجان قهوه روزانه'},
    {id:1, number:'23', name:'فنجان قهوه'}
  ]

  return (
    <div className='statistics relative pt-[130px] pb-[100px]'>
      <img className='absolute top-0 right-0 w-full h-full -z-10' src="../Public/Img/bg-shape-Statistics.webp" alt="bgshape" />
      <div className='container'>
        <div className='counter-card-wrap flex z-10'>
          <Countercard {...Statistics[0]} />
          <Countercard {...Statistics[1]} />
          <Countercard {...Statistics[2]} />
          <Countercard {...Statistics[3]} />
        </div>
      </div>
    </div>
  )
}
