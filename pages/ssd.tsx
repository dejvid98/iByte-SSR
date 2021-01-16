import React, { useState, useEffect } from 'react'
import { Radio, InputNumber, Rate, Select, Slider } from 'antd'
import { SelectValue } from 'antd/lib/select'
import Loader from 'react-loader-spinner'
import axios from 'axios'

import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductCard from '../components/ProductCard'

const SsdPage = () => {
  const [brand, setBrand] = useState()
  const [capacity, setCapacity] = useState()
  const [writeSpeed, setWriteSpeed] = useState()
  const [readSpeed, setReadSpeed] = useState()
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)
  const [rating, setRating] = useState(0)
  const [sort, setSort] = useState<SelectValue>()
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { Option } = Select

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

  const writeMarks = {
    100: 100,
    300: 300,
    500: 500,
    700: 700,
  }

  const readMarks = {
    100: 100,
    300: 300,
    500: 500,
  }

  const addToCart = (id: number) => {
    const cartObj = {}
    cartObj['cart'] = JSON.parse(window.localStorage.getItem('cart'))?.cart || []

    if (!cartObj['cart'].includes(id)) {
      cartObj['cart'] = [...cartObj['cart'], id]
      window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setProductsList([])
    let query = process.env.SERVER + 'ssd?'

    if (brand) {
      query = query + '&manufacturer=' + brand
    }

    if (capacity) {
      query = query + '&capacity=' + capacity
    }

    if (writeSpeed) {
      query = query + '&writeSpeed[gte]=' + writeSpeed
    }

    if (readSpeed) {
      query = query + '&readSpeed[gte]=' + readSpeed
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

    axios.get(query).then((data) => {
      setIsLoading(false)
      data.data.data.forEach((item) => {
        setProductsList((oldArr) => [...oldArr, item])
      })
    })
  }, [brand, capacity, readSpeed, writeSpeed, min, max, rating, sort])

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  return (
    <div>
      <Header />
      <div className='product-page-wrapper'>
        <div className='product-page-inner-wrapper'>
          <div className='product-page-heading'>
            <div className='product-page-heading-wrapper'>
              <h1>SSD</h1>
              <div className='sorting-box'>
                <div>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Sort by'
                    optionFilterProp='children'
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                  <Radio style={radioStyle} value='KINGSTON'>
                    Kingston
                  </Radio>
                  <Radio style={radioStyle} value='TRANSCEND'>
                    Transcend
                  </Radio>
                  <Radio style={radioStyle} value='WD'>
                    WD
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Capacity</p>

                <Radio.Group onChange={(e) => setCapacity(e.target.value)} value={capacity}>
                  <Radio style={radioStyle} value={128}>
                    128 GB
                  </Radio>

                  <Radio style={radioStyle} value={240}>
                    240 GB
                  </Radio>

                  <Radio style={radioStyle} value={480}>
                    480 GB
                  </Radio>

                  <Radio style={radioStyle} value={960}>
                    960 GB
                  </Radio>

                  <Radio style={radioStyle} value={2096}>
                    2096 GB
                  </Radio>
                </Radio.Group>
              </div>

              <div className='brands'>
                <p>Write Speed (MBps)</p>
                <div className='slider'>
                  <Slider
                    defaultValue={writeSpeed}
                    min={100}
                    max={700}
                    onChange={(value) => setWriteSpeed(value)}
                    marks={writeMarks}
                    step={null}
                  />
                </div>
              </div>

              <div className='brands'>
                <p>Read Speed (MBps)</p>
                <div className='slider'>
                  <Slider
                    defaultValue={readSpeed}
                    min={100}
                    max={500}
                    onChange={(value) => setReadSpeed(value)}
                    marks={readMarks}
                    step={null}
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
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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

export default SsdPage
