import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import CartItem from '../components/CartItem'
import { Button, Tooltip } from 'antd'

const cart = () => {
  const [cart, setCart] = useState(0)
  const [data, setData] = useState([])

  const fetchCartFromStorage = () => {
    const cartObj: any = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    axios.post(`${process.env.SERVER}product`, { ids: cartObj?.cart }).then((resp) => {
      setData(resp.data)
    })

    setCart(cartObj.cart.length)
  }

  const removeFromCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    const filteredCart = cartObj['cart'].filter((item) => item !== id)
    setCart((cart) => cart - 1)

    cartObj['cart'] = [...filteredCart]
    window.localStorage.setItem('cart', JSON.stringify(cartObj))
    fetchCartFromStorage()
  }

  useEffect(() => {
    fetchCartFromStorage()
  }, [])

  return (
    <div>
      <Header cart={cart} />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='search-wrapper flex justify-center items-center w-full'>
          <div className='review text-4xl not-italic mb-4 h-16 pb-2 w-full text-center mb-4'>
            <p className='mt-4'>Your shopping cart</p>
          </div>
          {data.length > 0 ? (
            <div className='flex-col justify-center items-center'>
              {data.map((product) => (
                <CartItem
                  manufacturer={product.manufacturer}
                  model={product.model}
                  photoURL={product.photoURL}
                  price={product.price}
                  key={product._id}
                  id={product._id}
                  removeFromCart={removeFromCart}
                />
              ))}
              <div className='w-full flex justify-center mt-6'>
                <Button type='primary' danger size='large'>
                  Place an order
                </Button>
              </div>
            </div>
          ) : (
            <h1 className='text-gray-400'>Your shopping card is currently empty.</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default cart
