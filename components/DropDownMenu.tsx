import React from 'react'
import Link from 'next/link'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const { SubMenu } = Menu

const menu = (
  <Menu>
    <SubMenu title='Computer Parts'>
      <Menu.Item key='0'>
        <Link href='/cpu'>CPUs</Link>
      </Menu.Item>

      <Menu.Item key='1'>
        <Link href='/gpu'>Graphic Cards</Link>
      </Menu.Item>

      <Menu.Item key='2'>
        <Link href='/motherboard'>Motherboards</Link>
      </Menu.Item>

      <Menu.Item key='3'>
        <Link href='/ssd'>Solid State Drives</Link>
      </Menu.Item>

      <Menu.Item key='4'>
        <Link href='/ram'>Random Access Memory</Link>
      </Menu.Item>

      <Menu.Item key='5'>
        <Link href='/powersupply'>Powersupply</Link>
      </Menu.Item>
    </SubMenu>

    <Menu.Item>
      <Link href='/laptop'>Laptop</Link>
    </Menu.Item>

    <Menu.Item>
      <Link href='/tv'>Television</Link>
    </Menu.Item>

    <Menu.Item>
      <Link href='/phone'>Phones</Link>
    </Menu.Item>
  </Menu>
)

const DropDownMenu = () => {
  return (
    <div>
      <Dropdown overlay={menu} overlayStyle={{ backgroundColor: 'yellow' }}>
        <div className='dropdownmenu-button'>
          <p>
            Products &nbsp; &nbsp; &nbsp;&nbsp;
            <DownOutlined />
          </p>
        </div>
      </Dropdown>
    </div>
  )
}

export default DropDownMenu
