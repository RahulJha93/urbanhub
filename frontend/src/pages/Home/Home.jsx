import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Banner from './Banner/Banner'
import LatestProduct from './Latest Product/LatestProduct'
import MetaData from '@/components/layout/MetaData'

const Home = () => {
  return (
    <>
    <MetaData title={"Buy Best Product Online"}></MetaData>
     <section className="px-[40px] ">
    <Banner />
    <LatestProduct/>
    {/* <Footer/> */}
    </section>
    </>

  )
}

export default Home