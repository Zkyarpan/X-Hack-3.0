import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";
import VegetablePrices from "../components/VegetablesPrices";

const WeatherCard = ({ data }) => (
  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-sm h-full">
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-medium">{data.location.name}</h3>
        </div>
        <p className="text-5xl font-bold mb-2">
          {Math.round(data.current.temp_c)}°C
        </p>
        <p className="text-lg opacity-90">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </p>
      </div>
      <div className="text-center">
        <img
          src={`http:${data.current.condition.icon}`}
          alt={data.current.condition.text}
          className="w-24 h-24 mb-2"
        />
        <p className="text-lg">{data.current.condition.text}</p>
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-emerald-100 rounded-lg">{icon}</div>
    </div>
    <p className="text-gray-600 mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const OrderCard = ({ order }) => (
  <div className="bg-white rounded-xl p-4 hover:shadow-sm transition-all border border-gray-100">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="font-medium text-gray-900">{order.buyer}</p>
        <p className="text-sm text-gray-500">
          {new Date(order.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
        {order.status}
      </span>
    </div>
    <p className="text-xl font-bold text-gray-900">${order.amount}</p>
  </div>
);

const FarmerDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [farmerData, setFarmerData] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse, farmerResponse] = await Promise.all([
          fetch(
            `http://api.weatherapi.com/v1/current.json?key=d7e95cc5eb484c4f9c5152226252501&q=Dharan`
          ),
          axios.get(`${baseUrl}/api/dashboard/farmer`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }),
        ]);

        const weather = await weatherResponse.json();
        setWeatherData(weather);
        setFarmerData(farmerResponse.data.Result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Main Content Container */}
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="h-[200px]">
                {weatherData && <WeatherCard data={weatherData} />}
              </div>
              <div className="h-[200px]">
                <StatCard
                  title="Total Earnings"
                  value={`$${farmerData?.earnings?.total || 0}`}
                  icon={
                    <svg
                      className="w-6 h-6 text-emerald-600"
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
              </div>
              <div className="h-[200px]">
                <StatCard
                  title="Total Value"
                  value={`$${farmerData?.overview?.totalValue || 0}`}
                  icon={
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Overview Section */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm h-[200px]">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Overview</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Total Plants</p>
                      <p className="text-2xl font-bold">
                        {farmerData?.overview?.totalPlants || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">Total Stock</p>
                      <p className="text-2xl font-bold">
                        {farmerData?.overview?.totalStock || 0}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-600 text-sm mb-1">
                        Average Price
                      </p>
                      <p className="text-2xl font-bold">
                        ${farmerData?.overview?.avgPrice?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add this to your dashboard grid */}
              <div className="col-span-3 lg:col-span-2">
                <VegetablePrices />
              </div>
              {/* Recent Orders Section */}
              <div className="bg-white rounded-2xl shadow-sm h-[580px] overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2">
                    {farmerData?.recentActivity?.orders
                      ?.slice(0, 3)
                      .map((order, index) => (
                        <OrderCard key={index} order={order} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
