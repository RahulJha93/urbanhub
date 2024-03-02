import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LatestProduct from "../products/LatestProduct";
import MetaData from "@/components/layout/MetaData";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import { ColorRing } from "react-loader-spinner";
import { toast, Toaster } from "sonner";
import Loader from "@/components/Loader/Loader";

const Home = () => {
  const { isLoading, data, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Buy Best Product Online"}></MetaData>
      <section className="sm:px-[40px] px-[20px] ">
        <Banner />
        <LatestProduct />

        {/* <Footer/> */}
      </section>
    </>
  );
};

export default Home;
