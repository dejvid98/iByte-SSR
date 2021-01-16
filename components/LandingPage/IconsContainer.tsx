import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faGift, faHeadset, faCreditCard } from '@fortawesome/free-solid-svg-icons'

const IconsContainer = () => {
  return (
    <div className='icons-container-wrapper'>
      <div className='icon-box'>
        <FontAwesomeIcon icon={faTruck} />
        <p>Free Shipping</p>
      </div>

      <div className='icon-box'>
        <FontAwesomeIcon icon={faGift} />
        <p>Monthly Gifts</p>
      </div>

      <div className='icon-box'>
        <FontAwesomeIcon icon={faHeadset} />
        <p>Customer Support</p>
      </div>

      <div className='icon-box'>
        <FontAwesomeIcon icon={faCreditCard} />
        <p>Online Payment</p>
      </div>
    </div>
  )
}

export default IconsContainer
