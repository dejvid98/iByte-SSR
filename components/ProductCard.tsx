import React from 'react'
import { Button, Rate } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link'

interface Props {
  manufacturer: string
  model: string
  photoURL: string
  price: number
  rating: number
  id?: number
  _id?: number
  addToCart: (id: number) => void
}

const ProductCard: React.FC<Props> = ({ manufacturer, model, price, photoURL, rating, id, addToCart }) => {
  return (
    <div>
      <div className='product-card-wrapper'>
        <Link href={`/${id}`}>
          <div className='prouct-card-image'>
            <img src={photoURL} alt='product' />
          </div>
        </Link>
        <p>
          {manufacturer} {model}
        </p>

        <Rate disabled defaultValue={rating} />
        <p>${price}.99</p>
        <Button icon={<ShoppingCartOutlined />} shape='round' danger onClick={() => addToCart(id)}>
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
