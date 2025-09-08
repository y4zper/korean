import React from 'react'
import Banner from './Banner'
import Category from './Category'
import Products from './Products'
import Collections from './Collections'
import BestSellers from './BestSellers'
import Newsletter from './Newsletter'
import TipoPiel from './TipoPiel'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Products/>
      <BestSellers/>
    </div>
  )
}

export default Home