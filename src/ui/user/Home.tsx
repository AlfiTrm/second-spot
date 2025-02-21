import React from 'react'
import Carousel from '../../components/partial/Carousel'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <Carousel />

      <section>
        <div>
          <div className='flex flex-col gap-3 text-black'>
            a
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home