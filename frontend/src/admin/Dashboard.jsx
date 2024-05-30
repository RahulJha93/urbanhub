import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Dashboard = () => {
  return (
    <section className="sm:px-[40px] px-[20px] pt-2">
      <h1 className="text-2xl font-semibold text-center">Admin Dashboard</h1>
      <div class="min-h-screen flex">
    {/* <!-- Sidebar --> */}
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-4">
        <nav class="mt-6">
          <ul>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">Dashboard</a>
            </li>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">New Product</a>
            </li>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">Products</a>
            </li>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">Orders</a>
            </li>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">Users</a>
            </li>
            <li class="mb-4">
              <a href="#" class="text-gray-600 block">Reviews</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    {/* <!-- Main Content --> */}
    <div class="flex-grow p-4">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <!-- Card 1 --> */}
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Total Sales</h2>
            <p class="text-2xl font-bold text-green-500">$24,000</p>
          </div>
          {/* <!-- Card 2 --> */}
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Total Orders</h2>
            <p class="text-2xl font-bold text-blue-500">1,200</p>
          </div>
          {/* <!-- Card 3 --> */}
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Total Products</h2>
            <p class="text-2xl font-bold text-yellow-500">320</p>
          </div>
          {/* <!-- Card 4 --> */}
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">New Customers</h2>
            <p class="text-2xl font-bold text-purple-500">80</p>
          </div>
        </div>

        {/* <!-- Chart Section --> */}
        <div class="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 class="text-lg font-semibold mb-4">Sales Overview</h2>
          <div id="chart" class="h-64 bg-gray-200 rounded-lg"></div>
        </div>
       
      </div>
    </div>
  </div>
    </section>
  );
};

export default Dashboard;
