import { Button } from "@/components/ui/button";
import React from "react";
// import logo from "../images/invoice-logo.png";
import { useParams } from "react-router-dom";
import { useGetOrderDeatilQuery } from "@/redux/api/orderApi";
import { useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useGetOrderDeatilQuery(params?.id);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);
  
  const handleDownload = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const pdfwidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfwidth, 0);
      pdf.save(`invoice_${data?.order?._id}.pdf`);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10">
      <div className="order-invoice w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Button onClick={handleDownload}>
            <i className="fa fa-print mr-2"></i> Download Invoice
          </Button>
        </div>
        <div id="order_invoice" className="p-6 border border-gray-400">
          <header className="clearfix mb-6">
            <div id="logo" className="text-center mb-4">
             <h1 className="text-4xl font-semibold">UrbanHub</h1>
            </div>
            <h1 className="text-center text-xl font-normal text-gray-700 mb-6">
              INVOICE #{data?.order?._id}
            </h1>
            <div className="flex justify-between">
              <div id="company" className="text-right">
                <div>UrbanHub</div>
                <div>
                  2011 , New City Heights
                  <br />
                  Thane,Maharashtra , IN
                </div>
                <div>+91 9999999999</div>
                <div>
                  <a href="mailto:info@shopit.com">info@Urbanhub.com</a>
                </div>
              </div>
              <div id="project">
                <div>
                  <span className="text-gray-500">Name</span>{" "}
                  {data?.order?.user?.name}
                </div>
                <div>
                  <span className="text-gray-500">EMAIL</span>{" "}
                  {data?.order?.user?.email}
                </div>
                <div>
                  <span className="text-gray-500">PHONE</span> +91{" "}
                  {data?.order?.shippingInfo.phoneNo}
                </div>
                <div>
                  <span className="text-gray-500">ADDRESS</span>{" "}
                  {data?.order?.shippingInfo.address},
                  {data?.order?.shippingInfo.city},{" "}
                  {data?.order?.shippingInfo.country}
                </div>
                <div>
                  <span className="text-gray-500">DATE</span>{" "}
                  {data?.order?.updatedAt.split("T")[0]}
                </div>
                <div>
                  <span className="text-gray-500">Status</span>{" "}
                  {data?.order?.paymentInfo?.status}
                </div>
              </div>
            </div>
          </header>
          <main>
            <table className="w-full border-collapse border-spacing-0 mb-6">
              <thead>
                <tr>
                  <th className="border-b border-gray-300 p-4 text-left text-gray-500">
                    ID
                  </th>
                  <th className="border-b border-gray-300 p-4 text-left text-gray-500">
                    NAME
                  </th>
                  <th className="border-b border-gray-300 p-4 text-right text-gray-500">
                    PRICE
                  </th>
                  <th className="border-b border-gray-300 p-4 text-right text-gray-500">
                    QTY
                  </th>
                  <th className="border-b border-gray-300 p-4 text-right text-gray-500">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.order?.orderItems?.map((item, index) => (
                  <tr className="bg-gray-100">
                    <td className="p-4 text-left">{index + 1}</td>
                    <td className="p-4 text-left">{item?.name}</td>
                    <td className="p-4 text-right">{item?.price}</td>
                    <td className="p-4 text-right">{item?.qty}</td>
                    <td className="p-4 text-right">
                      {item?.price * item?.qty}
                    </td>
                  </tr>
                ))}

                <tr className="bg-gray-100">
                  <td className="p-4 text-left" colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="p-4 text-right">{data?.order?.itemsPrice}</td>
                </tr>
                <tr>
                  <td className="p-4 text-left" colSpan="4">
                    <b>TAX 15%</b>
                  </td>
                  <td className="p-4 text-right">{data?.order?.taxAmount}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-4 text-left" colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="p-4 text-right">
                    {data?.order?.shippingAmount}
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-left" colSpan="4">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="p-4 text-right">{data?.order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div className="font-bold">NOTICE:</div>
              <div className="text-gray-500">
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer className="border-t border-gray-300 text-center py-4 text-gray-500">
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
