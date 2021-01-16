import React from 'react'
import { Rate, Button } from 'antd'

const Review = ({ username, comment, rating }) => {
  return (
    <div className='flex flex-col review mt-2'>
      <p>
        <span className='mr-4 font-bold '>{username}</span> <Rate disabled defaultValue={rating} />
      </p>
      <p className='comment'>"{comment}"</p>
    </div>
  )
}

export default Review
