import React from 'react'
import { Button } from 'antd'
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

const ProductCard: React.FC<Props> = ({ manufacturer, model, photoURL, id, addToCart }) => {
  return (
    <div>
      <div className='product-card-wrapper mt-6'>
        <Link href={`/${id}`}>
          <div className='prouct-card-image'>
            <img src={photoURL} alt='product' />
          </div>
        </Link>
        <p>
          {manufacturer} {model}
        </p>
        <Link href={`/review/${id}`}>
          <Button shape='round' danger onClick={() => addToCart(id)}>
            Write a review
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
