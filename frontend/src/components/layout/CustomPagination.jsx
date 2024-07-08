 import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";


const CustomPagination = ({ resPerPage, filteredProductCount }) => {
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    if(searchParams.has("page")){
      searchParams.set("page",pageNumber);
    }
    else {
      searchParams.set("page",pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);

  };

  return (
    <div className="flex justify-center gap-4">
      {filteredProductCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductCount}
          onChange={setCurrentPageNo}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemclass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
};

export default CustomPagination;

