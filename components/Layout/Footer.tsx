import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faAt } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'antd'
import { Button } from 'antd'

const Footer = () => {
  return (
    <div className="footer-main-wrapper">
      <div className="footer-second-block">
        <div className="news-letter-wrapper">
          <div className="news-letter-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>

          <div className="news-letter-header">
            <p>Newsletter</p>
            <p>Subscribe to our news letter</p>
          </div>

          <Input size="large" placeholder="E-mail" prefix={<FontAwesomeIcon icon={faAt} />} />

          <Button style={{ marginLeft: '2rem', borderRadius: '25px' }} size="large">
            Subscribe
          </Button>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="footer-first-block">
          <div className="footer-section">
            <p className="footer-section-header">Computer Parts</p>

            <p className="footer-section-item">
              <span>CPU</span>
            </p>

            <p className="footer-section-item">
              <span>GPU</span>
            </p>

            <p className="footer-section-item">
              <span>Motherboard</span>
            </p>

            <p className="footer-section-item">
              <span>Powersupply</span>
            </p>

            <p className="footer-section-item">
              <span>RAM</span>
            </p>
          </div>
          <div className="footer-section">
            <p className="footer-section-header">Phones</p>

            <p className="footer-section-item">
              <span>Apple</span>
            </p>

            <p className="footer-section-item">
              <span>Huawei</span>
            </p>

            <p className="footer-section-item">
              <span>Samsung</span>
            </p>

            <p className="footer-section-item">
              <span>Xiaomi</span>
            </p>
          </div>
          <div className="footer-section">
            <p className="footer-section-header">TV</p>

            <p className="footer-section-item">
              <span>LG</span>
            </p>

            <p className="footer-section-item">
              <span>Samsung</span>
            </p>

            <p className="footer-section-item">
              <span>Hisense</span>
            </p>
          </div>

          <div className="footer-section">
            <p className="footer-section-header">Navigation</p>

            <p className="footer-section-item">
              <span>Stores Location</span>
            </p>

            <p className="footer-section-item">
              <span>Payment Methods</span>
            </p>

            <p className="footer-section-item">
              <span>Frequent Questions</span>
            </p>

            <p className="footer-section-item">
              <span>Account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
