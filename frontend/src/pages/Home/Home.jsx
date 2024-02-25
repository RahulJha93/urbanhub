import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LatestProduct from "./Latest Product/LatestProduct";
import MetaData from "@/components/layout/MetaData";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import { ColorRing } from "react-loader-spinner";
import { toast, Toaster } from "sonner";

const Home = () => {
  const { isLoading, data, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading)
    return (
      <div className="flex justify-center h-[100vh] m-0 items-center ">
        <ColorRing
          visible={true}
          height="90"
          width="90"
          ariaLabel="color-ring-loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
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
