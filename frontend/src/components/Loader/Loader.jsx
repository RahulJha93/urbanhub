import React from 'react'
import { ColorRing } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className="flex justify-center h-[100vh] m-0 items-center ">
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="color-ring-loading"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
  )
}

export default Loader