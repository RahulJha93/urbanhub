import React, { useEffect, useState } from "react";
import LatestProduct from "../products/LatestProduct";
import MetaData from "@/components/layout/MetaData";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Loader from "@/components/Loader/Loader";
import CustomPagination from "@/components/layout/CustomPagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pcard from "../../components/card/Pcard";
import Filters from "@/components/layout/Filters";

const Electronics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min") ;
  const max = searchParams.get("max") ;
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  
  const params = { page, keyword};
  min!==null && (params.min=min)
  max!==null && (params.max=max)

  
  category && (params.category=category)
  ratings && (params.ratings=ratings)
 

  const { isLoading, data, error, isError } = useGetProductsQuery(params);

  const handleFilterChange = (filters) => {
    const newParams = { ...filters, page: 1 };
    setSearchParams(newParams);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Product Online"} />
      <div className="flex">
        <div className="w-1/4">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-3/4">
          {keyword.length ?  data?.products?.length >0 ?`${data?.products?.length} products found with ${keyword}` :"No product found" : ""}
          <section className="sm:px-[40px] px-[20px]">
            <div className="flex justify-evenly flex-wrap pt-5">
              {data?.products?.map((e, key) => (
                <Pcard product={e} key={key} />
              ))}
            </div>
            <div>
              <CustomPagination
                resPerPage={data?.resPerPage}
                filteredProductCount={data?.filteredProductCount}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Electronics;
