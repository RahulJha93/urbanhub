import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LatestProduct from "../products/LatestProduct";
import MetaData from "@/components/layout/MetaData";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import { ColorRing } from "react-loader-spinner";
import Loader from "@/components/Loader/Loader";
import CustomPagination from "@/components/layout/CustomPagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pcard from "../../components/card/Pcard";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = (searchParams.get("keyword")) || "";
  const params = { page ,keyword};
  const { isLoading, data, error, isError } = useGetProductsQuery(params);

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"Buy Best Product Online"}></MetaData>
      <section className="sm:px-[40px] px-[20px] ">
        <Banner />
        <h1 className="text-2xl mb-5 text-center p-5 font-semibold">
          Latest Product
        </h1>
        <div className="flex justify-evenly flex-wrap">
          {data?.products?.map((e, key) => {
            return <Pcard product={e} key={key} />;
          })}
        </div>
        <div>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductCount={data?.filteredProductCount}
          />
        </div>
        {/* <Electronics/> */}

        {/* <Footer/> */}
      </section>
    </>
  );
};

export default Home;
