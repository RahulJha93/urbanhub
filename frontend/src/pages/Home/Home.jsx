import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LatestProduct from "../products/LatestProduct";
import MetaData from "@/components/layout/MetaData";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import { ColorRing } from "react-loader-spinner";
import Loader from "@/components/Loader/Loader";
import CustomPagination from "@/components/layout/CustomPagination";

const Home = () => {
  const { isLoading, data, error, isError } = useGetProductsQuery();


  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Buy Best Product Online"}></MetaData>
      <section className="sm:px-[40px] px-[20px] ">
        <Banner />
        <LatestProduct />
        <div>
        <CustomPagination resPerPage={data?.resPerPage} filteredProductCount={
        data?.filteredProductCount
      }/>
      </div>
        {/* <Electronics/> */}

        {/* <Footer/> */}
      </section>
    </>
  );
};

export default Home;
