import { ReactNode } from 'react'
import Navbar from '../components/partial/Navbar'
import Footer from '../components/partial/Footer'


type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {

  return (
    <div>
      <Navbar />
      { children  }
      <Footer />
    </div>
  )
}

export default MainLayout
