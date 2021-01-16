import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'
import { Input, Rate, Button } from 'antd'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

const cart = ({ id }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState<any>('')
  const { TextArea } = Input

  const handleReview = async () => {
    const userDataz = window.localStorage.getItem('jwt')
    const userDataObj = JSON.parse(userDataz)
    console.log('hi')

    jwt.verify(userDataObj.jwt, 'secretTokenz', async (_, decoded) => {
      console.log(decoded)
      const resp = await axios.post(`${process.env.SERVER}product/review`, {
        productId: id,
        username: decoded.userInfo.username,
        comment,
        rating,
      })
      console.log(resp)
      Router.push(`/${id}`)
    })
  }
  return (
    <div>
      <Header />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='search-wrapper flex justify-center items-center w-full'>
          <div className='flex flex-col flex-wrap justify-start relative right-12'>
            <h1 className='my-4'>Write a review about bought product</h1>
            <TextArea
              rows={4}
              placeholder='Your thoughts about the product'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Rate className='my-2' value={rating} onChange={(e) => setRating(e)} />
            <Button type='primary' danger onClick={handleReview}>
              Submit
            </Button>
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

  return {
    props: { id },
  }
}
