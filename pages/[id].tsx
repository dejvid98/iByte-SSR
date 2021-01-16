import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Rate, Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Review from '../components/Review'

const product = ({ data, reviews }) => {
  const [cart, setCart] = useState(0)
  const filteredPropreties = Object.keys(data).filter((prop) => {
    if (prop !== 'photoURL' && prop !== '__v' && prop !== 'reviews' && prop !== 'price') return prop
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const addToCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    if (!cartObj['cart'].includes(id)) {
      setCart((cart) => cart + 1)
      cartObj['cart'] = [...cartObj['cart'], id]
      window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
  }

  const productProperties = filteredPropreties.map((property) => {
    let sufix = ''
    switch (property) {
      case 'memory' || 'storage' || 'ram' || 'hdd' || 'ssd' || 'capacity':
        sufix = 'GB'
        break
      case 'price':
        sufix = '$'
        break
      case 'speed' || 'writeSpeed' || 'readSpeed':
        sufix = 'Ghz'
        break
      case 'rating':
        sufix = 'stars'
        break
      case 'screen' || 'size':
        sufix = '″'
        break
      case 'power':
        sufix = 'W'
        break
      case 'ram':
        sufix = 'GB'
        break
      case 'camera':
        sufix = 'MP'
      default:
      // code block
    }
    return (
      <div className='flex items-center' style={{ color: '#444', fontSize: '12px' }}>
        <p style={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(property)}:</p>
        <p className='ml-2'>
          {data[property]} {sufix}
        </p>
      </div>
    )
  })

  useEffect(() => {
    const cartObj = JSON.parse(window.localStorage.getItem('cart'))?.cart || []
    setCart(cartObj.length)
  }, [])

  return (
    <div>
      <Header cart={cart} />
      <div className='product-page-wrapper'>
        <div className='product-page-inner-wrapper'>
          <div className='flex flex-col items-start'>
            <h1 className='mt-4'>
              {data.manufacturer} {data.model}
            </h1>
            <div className='flex items-center justify-center'>
              <Rate disabled defaultValue={data.rating} /> <p className='ml-3 relative top-2'>({reviews.length + 1})</p>
            </div>
          </div>
          <div className='flex review '>
            <div className='flex flex-col'>
              <div className='product-image-wrapper'>
                <img src={data.photoURL} alt='pic' />
              </div>
              <p className='text-2xl not-italic'>Reviews</p>
            </div>
            <div className='ml-8 mt-6 flex-col'>
              <div>{productProperties}</div>
              <div className='flex text-gray-600 mt-4 text-xl'>
                <i className='fas fa-shipping-fast  mr-2' />
                <p className='text-lg ml-2'>Free Shipping!</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-4xl'>{data.price} $</p>
                <Button
                  type='primary'
                  size='large'
                  danger
                  icon={<ShoppingCartOutlined />}
                  onClick={() => addToCart(data._id)}>
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
          <Review username='Nikola' rating={5} comment='This is great product' />
          {reviews.map((review) => (
            <Review username={review.username} rating={review.rating} comment={review.comment} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default product

export async function getServerSideProps(context) {
  const { id } = context.params
  const { data } = await axios.get(`${process.env.SERVER}product/${id}`)
  const response = await axios.get(`${process.env.SERVER}product/reviews/${id}`)

  return {
    props: { data, reviews: response.data },
  }
}
