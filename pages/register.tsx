import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Input, Button } from 'antd'
import Link from 'next/link'

const register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleRegister = async () => {
    await axios.post(`${process.env.SERVER}auth/register`, {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
    })
  }
  return (
    <div>
      <Header />
      <div className='product-page-wrapper min-h-full h-full'>
        <div className='product-page-inner-wrapper flex justify-center items-center '>
          <div className='review text-4xl not-italic mb-4 h-16 pb-2 w-full text-center mb-4'>
            <p className='mt-4'>Account Creation</p>
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
              placeholder='Usernam'
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

            <Link href='/login'>
              <p className='text-blue-500 cursor-pointer'>Already have an account? </p>
            </Link>
            <Button type='primary' size='large' onClick={handleRegister}>
              Register
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default register
