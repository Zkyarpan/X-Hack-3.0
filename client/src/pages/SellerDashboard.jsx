import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
      {change && (
        <span
          className={`text-sm font-medium ${
            change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </span>
      )}
    </div>
    <p className="text-gray-600 text-sm mb-1">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-all">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      </div>
      <p className="font-bold text-blue-600">₹{product.price}</p>
    </div>
  </div>
);

const SellerDashboard = () => {
  const mockData = {
    stats: {
      revenue: { value: "₹45,678", change: 12.5 },
      orders: { value: "123", change: 8.2 },
      products: { value: "45", change: -2.1 },
      customers: { value: "89", change: 15.3 },
    },
    topProducts: [
      { name: "Organic Tomatoes", stock: 150, price: "40/kg" },
      { name: "Fresh Potatoes", stock: 200, price: "35/kg" },
      { name: "Green Peas", stock: 80, price: "60/kg" },
      { name: "Carrots", stock: 120, price: "45/kg" },
    ],
    recentOrders: [
      { id: "1", customer: "John Doe", amount: 450, status: "Delivered" },
      { id: "2", customer: "Jane Smith", amount: 280, status: "Processing" },
      { id: "3", customer: "Mike Brown", amount: 560, status: "Pending" },
    ],
  };

  return (
    <div className="flex gap-1 bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={mockData.stats.revenue.value}
              change={mockData.stats.revenue.change}
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <StatCard
              title="Total Orders"
              value={mockData.stats.orders.value}
              change={mockData.stats.orders.change}
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              }
            />
            <StatCard
              title="Products"
              value={mockData.stats.products.value}
              change={mockData.stats.products.change}
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              }
            />
            <StatCard
              title="Customers"
              value={mockData.stats.customers.value}
              change={mockData.stats.customers.change}
              icon={
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Top Products</h2>
              <div className="space-y-3">
                {mockData.topProducts.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {mockData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">₹{order.amount}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
