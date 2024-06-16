import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div className="p-4 w-[500px]">
      {reviews.map((review, index) => (
        <div key={index} className="flex flex-col gap-4 md:flex-row md:gap-6 mb-6">
          <Avatar className="w-10 h-10 md:w-12 md:h-12 border">
            <AvatarImage src={review.userImage || "/placeholder-user.jpg"} />
            <AvatarFallback>{review.userInitials || "CN"}</AvatarFallback>
          </Avatar>
          <div className="grid gap-4 w-full">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">{review.user?.name || "Alex Smith"}</h3>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {review.time || "3 weeks ago"}
                </time>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <StarRatings
                  rating={review?.rating || 5}
                  starRatedColor="#14958F"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </div>
            </div>
            <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
              <p>{review?.comment || "Review text goes here..."}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
