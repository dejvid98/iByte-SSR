import React, { useState } from 'react'
import ReactDom from 'react-dom'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  return ReactDom.createPortal(
    <div>
      <h1>hi</h1>
      
    </div>,document.getElementById('portal')
  )
}

export default ChatBot
