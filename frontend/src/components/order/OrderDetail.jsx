import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Link, useParams } from "react-router-dom";
import { useGetOrderDeatilQuery } from "@/redux/api/orderApi"
import { useEffect } from "react"
import { userApi } from "@/redux/api/userApi"
import Loader from "../Loader/Loader"
import { Item } from "@radix-ui/react-dropdown-menu"
import { MdOutlineFileDownload } from "react-icons/md";


const OrderDetail = () => {
  const params = useParams();
  const {data,isLoading,error} = useGetOrderDeatilQuery(params?.id);

  useEffect(() => {
    if(data){
      console.log(data);
    }
    if(error){
      console.log(error?.data?.message);
    }
  
    
  }, [error]);

  if(isLoading) return <Loader/>

  const isPaid = data?.order?.paymentInfo?.status==="paid" ? true : false;
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex flex-col w-full max-w-5xl p-4 md:p-6">
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                  <CardTitle>Order Details</CardTitle>
                  <div className="flex items-center gap-2">
              <Link to={`/invoice/order/${data?.order?._id}`}>
                <Button variant="outline">
                  <MdOutlineFileDownload className="h-4 w-4 mr-2" />
                  Download Invoice
                  
                </Button>
                </Link>
              </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</div>
                        <div className="font-medium">#{data?.order?._id}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Date</div>
                        <div className="font-medium">{new Date(data?.order?.updatedAt).toLocaleString("en-US")}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</div>
                        <div className={isPaid ? "font-medium text-green-500" :  "text-red-500"}>{data?.order?.paymentInfo?.status}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Fulfillment Status</div>
                        <div className="font-medium text-blue-500">{data?.order?.orderStatus}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Address</div>
                      <div className="font-medium">
                       {data?.order?.user?.name}
                        <br />
                        {data?.order?.shippingInfo?.address},
                        <br />
                        {data?.order?.shippingInfo?.city},
                        {data?.order?.shippingInfo?.country}-
                        {data?.order?.shippingInfo?.pincode}
                        <br />
                        {data?.order?.shippingInfo?.phoneNo}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Method</div>
                      <div className="font-medium">Standard Shipping</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Method</div>
                        <div className="font-medium">{data?.order?.paymentsMethod}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount Paid</div>
                        <div className="font-medium">Rs {data?.order?.totalAmount}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Stripe ID</div>
                        <div className="font-medium ">{data?.order?.paymentInfo?.id || "NULL"}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Date</div>
                        <div className="font-medium ">{new Date(data?.order?.createdAt).toLocaleString("en-US")}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px] hidden md:table-cell">Image</TableHead>
                        <TableHead className="max-w-[150px]">Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data?.order?.orderItems?.map((item)=>(
                    <TableRow>
                    <TableCell className="hidden md:table-cell">
                      <img
                        src={item?.image}
                        width="64"
                        height="64"
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium ">{item?.name}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>Rs {item.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                    </TableCell>
                  </TableRow>
                  ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  )
}
export default OrderDetail;
