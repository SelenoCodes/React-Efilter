import React from 'react'

interface BookShape {
    price: number ;
    title: string ;
    img: string ;
}

const BookCard = ({price, title, img}: BookShape) => {
  return (
    <div className='border'>
     <img src={img} alt={title} className='w-30 cover' />
     <h2 className='font-bold text-xl'>{title}</h2>
     <p className='text-lg'>${price}</p>
    </div>
  )
}

export default BookCard
