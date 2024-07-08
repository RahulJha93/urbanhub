import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Search = () => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if(keyword?.trim()){
        navigate(`search/?keyword=${keyword}`);
    }else{
        navigate(`/`);
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <Input
        type="search"
        placeholder="Search . . ."
        className="w-96  hidden md:block lg:block "
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default Search;
