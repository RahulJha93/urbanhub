import React from "react";
import { Calendar } from "@/components/ui/calendar"


const check = () => {
  return (
    <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />
  );
};

export default check;
