 import React from "react";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";


const CustomPagination = ({ resPerPage, filteredProductCount }) => {
  const [currentPage, setCurrentPage] = useState("");

  let [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (e) => {

  };

  return (
    <div>
      {filteredProductCount && resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
        />
      )}
    </div>
  );
};

export default CustomPagination;

