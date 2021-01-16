import React, { useState } from 'react'

const Wrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {children}
      <div className='chatWrapper'>
        {isOpen ? (
          <iframe
            allow='microphone;'
            width='350'
            height='430'
            src='https://console.dialogflow.com/api-client/demo/embedded/6731cbb3-a43c-4f2a-9740-ac4d630f92e4'
          />
        ) : (
          <span
            className='text-5xl cursor-pointer flex items-center bg-red-500 text-white border-radius-rounded p-6'
            onClick={() => setIsOpen(true)}>
            {/* <p className='text-xl'>Need an assistance? Chat with us!</p> */}
            <i className='fas fa-headset text-5xl relative ' />
          </span>
        )}
      </div>
    </div>
  )
}

export default Wrapper
