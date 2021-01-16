import React from 'react'
import Link from 'next/link'
import Card from '../Card'

const SaleItems = () => {
  return (
    <div className='week-sale'>
      <h1 className='sale-header'>Products on sale this week</h1>
      <div className='cards-wrapper'>
        <Card imgLink='https://i.imgur.com/ORPSSMI.png' title='SAMSUNG TV QE75Q90RAT' descp='1999$' />
        <Link href='/gpu'>
          <Card imgLink='https://i.imgur.com/1MbR9vK.png' title='Asus GeForce RTX 2080 Ti Strix OC 8GB' descp='299$' />
        </Link>

        <Card imgLink='https://i.imgur.com/s9vfETK.png' title='APPLE iPhone XS 512GB' descp='1599$' />

        <Card imgLink='https://i.imgur.com/KF26G7b.png' title='APPLE MacBook Air 13 Retina ' descp='1799$' />
      </div>
    </div>
  )
}

export default SaleItems
