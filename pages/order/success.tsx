import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import Link from 'next/link'
import CartItem from '../../components/CartItem'
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

  const handleOrder = async () => {}

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
          <h1 className='text-gray-600 mt-6'>Your order has been placed!</h1>
          <Link href='/'>
            <h2 className='text-blue-400 cursor-pointer'>Back to shopping</h2>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default cart
