import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Input, Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import jwt from 'jsonwebtoken'

const profile = () => {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState([])
  const [password, setPassword] = useState('123123')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleUpdate = async () => {
    await axios.put(`${process.env.SERVER}auth/update`, {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
    })
  }

  useEffect(() => {
    const userData = window.localStorage.getItem('jwt')
    if (userData == null) Router.push('/login')
    const userDataObj = JSON.parse(userData)
    jwt.verify(userDataObj.jwt, 'secretTokenz', async (_, decoded) => {
      setEmail(decoded.userInfo.email)
      setUsername(decoded.userInfo.username)
      setFirstName(decoded.userInfo.firstName)
      setLastName(decoded.userInfo.lastName)
      setAddress(decoded.userInfo.address)
      setPhoneNumber(decoded.userInfo.phoneNumber)
      const { data } = await axios.get(`${process.env.SERVER}product/order/${decoded.userInfo.id}`)
      setOrders(data)
      console.log(data)
    })
  }, [])
  return (
    <div>
      <Header />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='product-page-inner-wrapper flex justify-center items-center '>
          <div className='flex w-full justify-between'>
            <div className='flex flex-col'>
              <div className='review text-4xl not-italic mb-4 h-16 pb-2 w-full text-center mb-4'>
                <p className='mt-4'>User Profile</p>
              </div>
              <div className='w-72 flex flex-col items-center'>
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='mb-4' />
                <Input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='mb-4'
                />
                <Input
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='mb-4'
                />
                <Input
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='mb-4'
                />
                <Input
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='mb-4'
                />
                <Input
                  placeholder='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='mb-4'
                />
                <Input
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='mb-4'
                />

                <Button type='primary' size='large' onClick={handleUpdate}>
                  Update Info
                </Button>
              </div>
            </div>
            <div className='flex flex-col w-4/5 items-center'>
              <div className='review text-4xl not-italic mb-4 h-16 pb-2 w-full text-center mb-4'>
                <p className='mt-4'>Orders</p>
              </div>
              <div className='flex flex-col items-center w-3/4 '>
                {orders.map((order, key) => (
                  <div className='flex w-full text-gray-400 review items-center' key={key}>
                    <p className='mr-2'>Date: {new Date(order.orderDate).toUTCString()}</p>
                    <p>Status: Processing</p>
                    <Link href={`order/${order._id}`}>
                      <Button type='primary' className='ml-auto mr-2 relative bottom-1'>
                        Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default profile
