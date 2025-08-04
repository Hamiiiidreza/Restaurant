import React from 'react';
import Countercard from './Countercard';

export default function Counter() {
  const statistics = [
    { id: 1, number: '210', name: 'لحظات عالی' },
    { id: 2, number: '160', name: 'لحظات عالی' },
    { id: 3, number: '470', name: 'فنجان قهوه روزانه' },
    { id: 4, number: '23', name: 'فنجان قهوه' }
  ];

  return (
    <div className='statistics relative pt-[130px] pb-[100px]'>
      <img
        className='absolute top-0 right-0 w-full h-full -z-10'
        src="../Public/Img/bg-shape-Statistics.webp"
        alt="bgshape"
      />
      <div className='container'>
        <div className='counter-card-wrap flex z-10'>
          {statistics.map(stat => (
            <Countercard
              key={stat.id}
              number={stat.number}
              name={stat.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
