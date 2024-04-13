import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "@/components/Loader/Loader";
import { countries } from "countries-list";
import { useDispatch } from "react-redux";
import { saveShippingInfo } from "@/redux/features/cartSlice";

const Shipping = () => {
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, country, pincode }));
  };
  return (
    <div className="flex justify-center m-0 items-center h-[100vh] ">
      <Card className="w-[350px] ">
        <form onSubmit={submitHandler}>
          <CardContent className="pt-3">
            <h1 className="text-2xl font-semibold">Shipping Info</h1>
            <div className="grid w-full items-center gap-4 mt-7">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Address</Label>
                <Input
                  id="name"
                  placeholder=" Enter Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">City</Label>
                <Input
                  id="name"
                  placeholder="Enter Your City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Phone No.</Label>
                <Input
                  id="name"
                  placeholder="Enter Your PhoneNo"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Pin Code</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Pincode"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Country</Label>
                <Select onChange={(e) => setCountry(e.target.value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {countryList?.map((country) => (
                        <SelectItem value={country?.name}>
                          {country?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-start flex-col mt-[-0.7rem]">
            <Button className="w-full">
              {/* { isLoading?<Loader/>:"Login"} */}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Shipping;
