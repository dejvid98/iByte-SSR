import React from 'react'
import { Carousel } from 'antd'

const Carouselz = () => {
    return (
        <div className='car-wrapper'>
            <Carousel autoplay>
                <div id='iphones'></div>
                <div id='computer'>d</div>
                <div id='keyboard'></div>
            </Carousel>
        </div>
    )
}

export default Carouselz
