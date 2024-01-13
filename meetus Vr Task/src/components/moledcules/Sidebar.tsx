import React from 'react'
import { Nav } from 'react-bootstrap'
import Logo from '../atoms/Logo'
import TaskLogo from '../../../public/tasks.svg'
const Sidebar = () => {
  return (
    <div className='sidebar'>
            <Nav
              className=" sidebar-content"
              activeKey="/"
            >
                <Nav.Item>
                    <Logo />
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/" className='active '> 
                <div className='d-flex text-center flex-row align-items-center '>

                    <div><img  src={TaskLogo} alt="nav-icon" className='nav-logo' /></div>
                    <div className='nav-text'>Tasks</div>
                </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
  )
}

export default Sidebar