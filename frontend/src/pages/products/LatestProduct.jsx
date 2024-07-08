import React,{useEffect, useState} from "react";
import { useGetProductsQuery } from "@/redux/api/productsApi";
import Pcard from "../../components/card/Pcard";
import { toast, Toaster } from "sonner";



const LatestProduct = () => {
  const { data, error, isLoading,isError } = useGetProductsQuery();
  const [appear,setAppear] = useState("0");

  useEffect(() => {
   //to be fix later
  if(data){
    console.log(data)
  }
  if(error){
    console.log(error);
    toast.error(error?.message)
  }
  }, [data,error])
  

  return (
    <>
      <h1 className="text-2xl mb-5 text-center p-5 font-semibold">Latest Product</h1>
      <div className="flex justify-evenly flex-wrap">
        {data?.products?.map((e,key) => {
          return <Pcard product={e} key={key} />
        })}
      </div>
      

    </>
  );
};

export default LatestProduct;
