import React from 'react'
import { Card } from 'antd'

interface Props {
  imgLink: string
  title: string
  descp: string
}

const Cardz: React.FC<Props> = ({ imgLink, title, descp }) => {
  const { Meta } = Card

  return (
    <div style={{ marginRight: '2rem' }} className='card'>
      <Card hoverable style={{ width: 265 }} cover={<img alt='example' src={imgLink} />}>
        <Meta title={title} description={descp} />
      </Card>
    </div>
  )
}

export default Cardz
