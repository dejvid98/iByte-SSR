import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import Link from 'next/link'
import CartItem from '../../components/CartItem'
import { Button, Tooltip } from 'antd'
import ProductReviewCard from '../../components/ProductReviewCard'

const cart = ({ data }) => {
  const [cart, setCart] = useState<any>()

  const addToCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    if (!cartObj['cart'].includes(id)) {
      setCart((cart) => cart + 1)
      cartObj['cart'] = [...cartObj['cart'], id]
      window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
  }
  return (
    <div>
      <Header />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='search-wrapper flex justify-center items-center w-full'>
          <div className='flex flex-wrap justify-start relative right-12'>
            {data.map((product) => (
              <ProductReviewCard
                manufacturer={product.manufacturer}
                model={product.model}
                photoURL={product.photoURL}
                price={product.price}
                rating={product.rating * 1}
                key={product._id}
                id={product._id}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default cart

export async function getServerSideProps(context) {
  const { id } = context.params
  const { data } = await axios.get(`${process.env.SERVER}product/multiplebyid/${id}`)

  return {
    props: { data },
  }
}
