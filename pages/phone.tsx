import React, { useState, useEffect } from 'react'
import { Radio, Slider, InputNumber, Rate, Select } from 'antd'
import { SelectValue } from 'antd/lib/select'
import axios from 'axios'
import Loader from 'react-loader-spinner'

import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductCard from '../components/ProductCard'

const phone = () => {
  const [brand, setBrand] = useState()
  const [ram, setRam] = useState()
  const [storage, setStorage] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(3000)
  const [rating, setRating] = useState(0)
  const [sort, setSort] = useState<SelectValue>()
  const [productsList, setProductsList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { Option } = Select

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  let minPrice = 0
  let maxPrice = 3000

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
    64: 64,
    128: 128,
    256: 256,
    512: 512,
  }

  const addToCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    if (!cartObj['cart'].includes(id)) {
      cartObj['cart'] = [...cartObj['cart'], id]
      window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
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
    setIsLoading(true)
    setProductsList([])
    let query = process.env.SERVER + 'phone?'

    if (brand) {
      query = query + '&manufacturer=' + brand
    }

    if (ram) {
      query = query + '&ram=' + ram
    }

    if (storage) {
      query = query + '&memory[gte]=' + storage
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
    console.log(resp)
  }, [brand, ram, storage, min, max, rating, sort])

  return (
    <div>
      <Header />
      <div className='product-page-wrapper'>
        <div className='product-page-inner-wrapper'>
          <div className='product-page-heading'>
            <div className='product-page-heading-wrapper'>
              <h1>Phones</h1>
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
                  <Radio style={radioStyle} value='Apple'>
                    Apple
                  </Radio>

                  <Radio style={radioStyle} value='SAMSUNG'>
                    Samsung
                  </Radio>

                  <Radio style={radioStyle} value='Huawei'>
                    Huawei
                  </Radio>

                  <Radio style={radioStyle} value='Xiaomi'>
                    Xiaomi
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Memory</p>

                <Radio.Group onChange={(e) => setRam(e.target.value)} value={ram}>
                  <Radio style={radioStyle} value={4}>
                    4 GB
                  </Radio>

                  <Radio style={radioStyle} value={6}>
                    6 GB
                  </Radio>

                  <Radio style={radioStyle} value={8}>
                    8 GB
                  </Radio>

                  <Radio style={radioStyle} value={12}>
                    12 GB
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Storage (GB)</p>
                <div className='slider'>
                  <Slider
                    defaultValue={storage}
                    min={64}
                    max={512}
                    marks={speedMarks}
                    step={null}
                    onChange={(value) => setStorage(value)}
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

export default phone
