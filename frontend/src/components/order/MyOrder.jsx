import { useMyOrdersQuery } from "@/redux/api/orderApi";
import React, { useEffect } from "react";
import { toast } from "sonner";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IoEyeOutline } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartItem } from "@/redux/features/cartSlice";

const MyOrder = () => {
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const order_Success = searchParams.get("order_success");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (data) {
      console.log(data);
    }
    if (order_Success) {
     dispatch(clearCartItem());
     navigate("/me/orders")
    }
  }, [error, data, order_Success, dispatch, navigate]);

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="pt-10 font-semibold text-xl text-center">
        {data?.order?.length} Orders
      </h1>
      <div className="flex justify-center p-10">
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                {data?.order?.map((order) => (
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {order?._id}
                      </TableCell>
                      <TableCell>{order?.totalAmount}</TableCell>
                      <TableCell>{(order?.paymentInfo?.status).toUpperCase()}</TableCell>
                      <TableCell>{(order?.orderStatus)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            <Link to={`/me/orders/${order?._id}`}>
                          <Button variant="outline" size="icon">
                            <IoEyeOutline className="h-4 w-4" />
                            <span className="sr-only">View Order</span>
                          </Button>
                          </Link>
                          <Link to={`/invoice/order/${order?._id}`}>
                          <Button variant="outline" size="icon">
                            <FiPrinter className="h-4 w-4" />
                            <span className="sr-only">Print Invoice</span>
                          </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
