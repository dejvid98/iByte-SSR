import React from 'react'

const Cataloge = () => {
  return (
    <div className='cat-wrapper'>
      <h1 className='cat-header'>Catalogue</h1>
      <div className='products-cataloge'>
        <div className='illustration'>
          <img src='phone.svg' alt='phone' />
          <p>Phones</p>
        </div>

        <div className='illustration'>
          <img src='laptop.svg' alt='laptop' />
          <p>Computers</p>
        </div>

        <div className='illustration'>
          <img src='tv.svg' alt='tv' />
          <p>TVs</p>
        </div>
      </div>
    </div>
  )
}

export default Cataloge
