import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import ProductCard from '../../components/ProductCard'

const product = ({ data }) => {
  const [cart, setCart] = useState(0)

  const addToCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    if (!cartObj['cart'].includes(id)) {
      setCart((cart) => cart + 1)
      cartObj['cart'] = [...cartObj['cart'], id]
      window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
  }

  useEffect(() => {
    const cartObj = JSON.parse(window.localStorage.getItem('cart'))?.cart || []
    setCart(cartObj.length)
  }, [])
  
  return (
    <div>
      <Header cart={cart} />
      <div className='product-page-wrapper'>
        <div className='search-wrapper'>
          <div className='review text-4xl not-italic mb-4 h-16 pb-2'>
            <p className='mt-4'>Total results : {data.length}</p>
          </div>
          <div className='flex flex-wrap justify-start relative right-12'>
            {data.map((product) => (
              <ProductCard
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

export default product

export async function getServerSideProps(context) {
  const { query } = context.params
  const { data } = await axios.get(`${process.env.SERVER}product/search/${query}`)

  return {
    props: { data },
  }
}
