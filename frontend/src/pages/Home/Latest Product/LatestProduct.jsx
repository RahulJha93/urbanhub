import React from "react";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Pcard from "../../../components/card/Pcard";

const LatestProduct = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  return (
    <>
      <h1 className="text-2xl mb-5">LatestProduct</h1>
      <div className="flex justify-between flex-wrap">
        {data?.products?.map((e) => {
          return <Pcard product={e} />;
        })}
      </div>
    </>
  );
};

export default LatestProduct;
