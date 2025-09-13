import React from 'react'
import Banner from './Banner'
import Category from './Category'
import Products from './Products'
import Collections from './Collections'
import BestSellers from './BestSellers'
import Newsletter from './Newsletter'
import TipoPiel from './TipoPiel'
import Banner2 from './Banner2'

const Home = () => {
  return (
    <div>
      <Banner2/>
      <Products/>
      <Banner />
      <BestSellers/>
      <Newsletter/>
    </div>
  )
}

export default Home