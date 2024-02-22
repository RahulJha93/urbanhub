import React,{ useEffect } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Banner from './Banner/Banner'
import LatestProduct from './Latest Product/LatestProduct'
import MetaData from '@/components/layout/MetaData'
import { useGetProductsQuery } from '@/redux/api/productsApi'

const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  useEffect(() => {
    if (error) {
      console.error('Error fetching products:', error);
    }
    if (data) {
      console.log('Products fetched successfully:', data);
    }
  }, [data, error]);
  return (
    <>
    <MetaData title={"Buy Best Product Online"}></MetaData>
     <section className="sm:px-[40px] px-[20px] ">
    <Banner />
    <LatestProduct/>
    {/* <Footer/> */}
    </section>
    </>

  )
}

export default Home