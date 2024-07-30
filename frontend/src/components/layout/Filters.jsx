import { PRODUCT_CATEGORIES } from "@/constant/constant";
import { getPriceQueryParams } from "@/helper/helper";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";


const RATINGS = [1, 2, 3, 4, 5];

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState("");

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleGoButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      searchParams.set("category", selectedCategory);
    } else {
      searchParams.delete("category");
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setRatings(selectedRating);
    if (selectedRating) {
      searchParams.set("ratings", selectedRating);
    } else {
      searchParams.delete("ratings");
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4 w-64">
      <h2 className="text-2xl font-bold mb-4">Filter Products</h2>
      <form onSubmit={handleGoButtonClick}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <Button className="mt-2"> GO </Button>
       
      </form>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">None</option>
          {PRODUCT_CATEGORIES.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ratings
        </label>
        <select
          value={ratings}
          onChange={handleRatingChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Rating</option>
          {RATINGS.map((rate, index) => (
            <option key={index} value={rate}>
              {rate} Star{rate > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
