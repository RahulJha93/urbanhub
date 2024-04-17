import React,{useEffect, useState} from "react";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Pcard from "../../components/card/Pcard";
import { toast, Toaster } from "sonner";


const LatestProduct = () => {
  const { data, error, isLoading,isError } = useGetProductsQuery();
  const [appear,setAppear] = useState("0");

  useEffect(() => {
   //to be fix later

    if (!data) {
      if(appear=="1"){
        console.log("After next turn :");
        console.log(appear)
      }else{
        console.log("Before :");
        console.log(appear)
        setAppear("1");
        console.log("After setting :");
        console.log(appear)
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
  }, [])
  

  return (
    <>
      <h1 className="text-2xl mb-5">Latest Product</h1>
      <div className="flex justify-between flex-wrap">
        {data?.products?.map((e,key) => {
          return <Pcard product={e} key={key} />
        })}
      </div>
    </>
  );
};

export default LatestProduct;
