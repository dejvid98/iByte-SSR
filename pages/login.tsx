import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Input, Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

const register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await axios.post(`${process.env.SERVER}auth/login`, {
      email,
      password,
    })
  }

  useEffect(() => {
    const userData = window.localStorage.getItem('jwt')
    if (userData != null) Router.push('/profile')
  }, [])

  return (
    <div>
      <Header />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='product-page-inner-wrapper flex justify-center items-center '>
          <div className='review text-4xl not-italic mb-4 h-16 pb-2 w-full text-center mb-4'>
            <p className='mt-4'>Login</p>
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
            <Link href='/register'>
              <p className='text-blue-500 cursor-pointer'>New to iByte? Join now </p>
            </Link>

            <Button type='primary' size='large' onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default register
