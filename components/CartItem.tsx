import React, { useState } from 'react'

const CartItem = ({ photoURL, manufacturer, model, price, id, removeFromCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [isHidden, setIsHidden] = useState(false)
  return (
    <>
      {!isHidden && (
        <div className='review mt-4 pb-2 cart-item'>
          <div className='flex w-full'>
            <div className='flex w-full'>
              <img src={photoURL} alt='pic' className='w-20 mr-8 ' />
              <div className='w-full'>
                <div className='flex w-full'>
                  <p className='text-xl'>
                    {manufacturer} {model}
                  </p>
                  <span
                    onClick={() => {
                      setIsHidden(true)
                      removeFromCart(id)
                    }}
                    className='ml-auto'>
                    <i className='fas fa-times text-red-500 text-xl cursor-pointer ml-auto' />
                  </span>
                </div>
                <div className='flex'>
                  <p>
                    <span
                      onClick={() =>
                        setQuantity((prevState) => {
                          console.log('hi')
                          console.log(quantity)
                          if (prevState > 1) return prevState - 1
                          else return prevState
                        })
                      }>
                      <i className='fas fa-minus mr-4 cursor-pointer' />
                    </span>
                    Quantity {quantity}
                    <span onClick={() => setQuantity((prevState) => prevState + 1)}>
                      <i className='fas fa-plus cursor-pointer ml-4' />
                    </span>
                  </p>
                  <p className='text-xl ml-auto'>{price * quantity}$</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartItem
