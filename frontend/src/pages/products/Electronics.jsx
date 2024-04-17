import { useGetProductsByCategoryQuery } from '@/redux/api/productsApi';
import React from 'react'

const Electronics = () => {
    const { data, isLoading, error, isError } = useGetProductsByCategoryQuery(
        "Electronics"
      );
      console.log(data);
      
  return (
    <div>Electronics</div>
  )
}

export default Electronics;