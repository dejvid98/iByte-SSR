import React from 'react'

import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Carousel from '../components/LandingPage/Carousel'
import Cataloge from '../components/LandingPage/Cataloge'
import SaleItems from '../components/LandingPage/SaleItems'
import IconsContainer from '../components/LandingPage/IconsContainer'

const LandingPage = () => {
  return (
    <div className='landing-wrapper'>
      <Header />
      <div className='landing-body'>
        <Carousel />
        <IconsContainer />
        <SaleItems />
        <Cataloge />
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
