import React, { useState, useEffect } from 'react'
import { Radio, Slider, InputNumber, Rate, Select } from 'antd'
import { SelectValue } from 'antd/lib/select'
import axios from 'axios'
import Loader from 'react-loader-spinner'

import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductCard from '../components/ProductCard'

const cpu = () => {
  const [brand, setBrand] = useState()
  const [cores, setCores] = useState()
  const [speed, setSpeed] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)
  const [rating, setRating] = useState(0)
  const [sort, setSort] = useState<SelectValue>()
  const [productsList, setProductsList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { Option } = Select
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

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  let minPrice = 0
  let maxPrice = 1000

  const handleMinPrice = (event) => {
    if (event.key === 'Enter') {
      setMin(minPrice - 0.99)
    }
  }

  const handleMaxPrice = (event) => {
    if (event.key === 'Enter') {
      setMax(maxPrice)
    }
  }

  const speedMarks = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  }

  interface Product {
    manufacturer: string
    model: string
    photoURL: string
    price: number
    rating: number
    id: number
    _id: number
  }

  useEffect(() => {
    const cartObj = JSON.parse(window.localStorage.getItem('cart'))?.cart || []
    setCart(cartObj.length)
    setIsLoading(true)
    setProductsList([])

    let query = process.env.SERVER + 'cpu?'

    if (brand) {
      query = query + '&manufacturer=' + brand
    }

    if (cores) {
      query = query + '&cores=' + cores
    }

    if (speed) {
      query = query + '&speed[gte]=' + speed
    }

    if (min) {
      query = query + '&price[gt]=' + min
    }

    if (max) {
      query = query + '&price[lt]=' + max
    }

    if (rating) {
      query = query + '&rating[gte]=' + rating
    }

    if (sort) {
      query = query + '&sort=' + sort
    }

    const resp = axios.get(query).then((data) => {
      setIsLoading(false)
      data.data.data.forEach((item) => {
        setProductsList((oldArr: any[]) => [...oldArr, item])
      })
    })
  }, [brand, cores, speed, min, max, rating, sort])

  return (
    <div>
      <Header cart={cart} />
      <div className='product-page-wrapper'>
        <div className='product-page-inner-wrapper'>
          <div className='product-page-heading'>
            <div className='product-page-heading-wrapper'>
              <h1>Processors</h1>
              <div className='sorting-box'>
                <div>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Sort by'
                    optionFilterProp='children'
                    filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    onChange={(value) => setSort(value)}>
                    <Option value='price'>Price Ascending</Option>
                    <Option value='-price'>Price Descending</Option>
                    <Option value='-rating'>Rating</Option>
                    <Option value='model'>Model Name</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className='product-page-body'>
            <div className='product-filters'>
              <div className='brands'>
                <p>Brands</p>

                <Radio.Group onChange={(e) => setBrand(e.target.value)} value={brand}>
                  <Radio style={radioStyle} value='AMD'>
                    AMD
                  </Radio>

                  <Radio style={radioStyle} value='INTEL'>
                    Intel
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Cores</p>

                <Radio.Group onChange={(e) => setCores(e.target.value)} value={cores}>
                  <Radio style={radioStyle} value={2}>
                    2 Cores
                  </Radio>

                  <Radio style={radioStyle} value={4}>
                    4 Cores
                  </Radio>

                  <Radio style={radioStyle} value={6}>
                    6 Cores
                  </Radio>

                  <Radio style={radioStyle} value={12}>
                    12 Cores
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Speed (GHz)</p>
                <div className='slider'>
                  <Slider
                    defaultValue={speed}
                    min={1}
                    max={5}
                    marks={speedMarks}
                    step={null}
                    onChange={(value) => setSpeed(value)}
                  />
                </div>
              </div>

              <div className='brands'>
                <p>Price Limit</p>
                <div className='price-limit-wrapper'>
                  <div className='price-limit-box'>
                    <p>Min</p>
                    <InputNumber
                      defaultValue={minPrice}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value: any) => value?.replace(/\$\s?|(,*)/g, '')}
                      onChange={(value: any) => (minPrice = value)}
                      onKeyDown={handleMinPrice}
                    />
                  </div>
                  <div className='price-limit-box'>
                    <p>Max</p>
                    <InputNumber
                      defaultValue={maxPrice}
                      formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      onChange={(value: any) => (maxPrice = value)}
                      onKeyDown={handleMaxPrice}
                    />
                  </div>
                </div>
              </div>

              <div className='brands'>
                <p>Rating</p>
                <div className='ratings-wrapper'>
                  <div onClick={() => setRating(4)} className='rating-box'>
                    <Rate disabled defaultValue={4} />
                    <p> & Up</p>
                  </div>
                  <div onClick={() => setRating(3)} className='rating-box'>
                    <Rate disabled defaultValue={3} />
                    <p> & Up</p>
                  </div>
                  <div onClick={() => setRating(2)} className='rating-box'>
                    <Rate disabled defaultValue={2} />
                    <p> & Up</p>
                  </div>
                  <div onClick={() => setRating(1)} className='rating-box'>
                    <Rate disabled defaultValue={1} />
                    <p> & Up</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='product-list'>
              {isLoading ? (
                <div className='loading'>
                  <Loader type='Puff' color='#ff6363' height={200} width={200} timeout={0} />
                </div>
              ) : null}
              {productsList.map((item) => {
                return (
                  <ProductCard
                    manufacturer={item.manufacturer}
                    model={item.model}
                    photoURL={item.photoURL}
                    price={item.price}
                    rating={item.rating * 1}
                    key={item._id}
                    id={item._id}
                    addToCart={addToCart}
                  />
                )
              })}

              {!isLoading && productsList.length < 1 ? (
                <div className='no-match'>
                  <p>No results matched</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default cpu
