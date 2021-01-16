import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import { UserOutlined, PhoneOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import DropDownMenu from '../DropDownMenu'
import Router from 'next/router'

interface Props {
  cart?: any
}

const Header = ({ cart }: Props) => {
  const { Search } = Input
  const [cartState, setCartState] = useState(0)

  const buttonStyle = {
    borderRadius: '15rem',
    backgroundColor: '#e23e57',
    border: '2px solid #e23e57',
    marginLeft: '1rem',
  }

  const scrollToSale = () => {
    const sale = document.querySelector('.sale-header') as HTMLElement
    sale.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToCat = () => {
    const cat = document.querySelector('.cat-header') as HTMLElement
    cat.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearch = (query) => {
    Router.push(`/search/${query}`)
  }

  useEffect(() => {
    const cartObj = JSON.parse(window.localStorage.getItem('cart'))?.cart || []
    setCartState(cartObj.length)
  }, [])

  return (
    <div className='header-container'>
      <div className='header-first-block'>
        <div className='header-navigation-text'>
          <p>Stores Location</p>
        </div>
        <div className='divider'>
          <p>|</p>
        </div>
        <div className='header-navigation-text'>
          <p>Payment Methods</p>
        </div>
        <div className='divider'>
          <p>|</p>
        </div>
        <div className='header-navigation-text'>
          <p>Frequent Questions</p>
        </div>
      </div>

      <div className='header-second-block'>
        <div className='header-logo-image-container'>
          <Link href='/'>
            <img src='https://i.imgur.com/L7RowNs.png' alt='Logo' className='header-logo-image' />
          </Link>
          <Search
            placeholder='Search'
            onSearch={(value) => handleSearch(value)}
            size='large'
            style={{ width: '37rem' }}
          />
        </div>

        <div className='header-buttons-wrapper'>
          <Link href='/login'>
            <Button type='primary' icon={<UserOutlined />} size='large' style={buttonStyle} className='header-button'>
              My Account
            </Button>
          </Link>
          <Link href='/cart'>
            <Button
              type='primary'
              icon={<ShoppingCartOutlined />}
              size='large'
              style={buttonStyle}
              className='header-button'>
              Shopping Cart ({cart || cartState})
            </Button>
          </Link>
        </div>
      </div>

      <div className='header-third-block'>
        <DropDownMenu />
        <div className='header-announcments'>
          <div className='header-sale-wrapper'>
            <p className='header-sale' onClick={scrollToSale}>
              SALE
            </p>
            <p className='header-sale' onClick={scrollToCat}>
              CATALOGUE
            </p>
          </div>
          <p className='header-call-center'>
            <PhoneOutlined /> Call Center 0700-100-200
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
