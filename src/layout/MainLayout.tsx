import React, { ReactNode } from 'react'
import Navbar from '../components/partial/Navbar'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {

  return (
    <div>
      <Navbar />
      <div>
      { children  }
      </div>
    </div>
  )
}

export default MainLayout
