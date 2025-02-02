import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { Search, Filter, Map, Phone, Mail, X, CloudFog } from "lucide-react";
import axios from "axios";

const SellerExplore = () => {
  const [selectedVeg, setSelectedVeg] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");

  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/plants/getAllPlants`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });

        setVegetables(response.data.Result.plants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, [baseUrl, token]);

  console.log(vegetables);
  return (
    <div className="flex gap-1 bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <div className="p-6 h-[90vh] overflow-y-scroll">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Explore Vegetables</h1>
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vegetables..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-[300px] focus:outline-none focus:ring-2 focus:ring-[#2D775C]/20 focus:border-[#2D775C]"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>
          </div>

          <div className="flex">
            <div
              className={`flex-1 transition-all duration-300 ${
                selectedVeg ? "mr-[400px]" : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                {vegetables.map((veg) => (
                  <div
                    key={veg.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <img
                      src={veg.images?.[0] || "https://via.placeholder.com/150"}
                      alt={veg.name}
                      className="w-full h-56 object-cover rounded-t-xl"
                    />
                    <div className="p-5 space-y-4 flex-1 flex flex-col">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {veg.name}
                        </h3>
                        <p className="text-[#2D775C]">{veg.farmer}</p>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Map className="h-4 w-4" />
                        <span>{veg.location}</span>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-semibold text-gray-900">
                            {veg.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Available</p>
                          <p className="font-medium text-gray-900">
                            {veg.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 bg-[#2D775C] hover:bg-[#2D775C]/90 text-white py-2.5 px-4 rounded-lg transition-colors text-sm font-medium">
                          Contact
                        </button>
                        <button
                          onClick={() => setSelectedVeg(veg)}
                          className="flex-1 border border-[#2D775C] text-[#2D775C] hover:bg-[#2D775C]/5 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedVeg && (
              <div className="fixed right-0 top-0 h-[calc(100vh-64px)] w-[400px] bg-white shadow-lg translate-x-0 transition-transform duration-300 mt-[64px] overflow-auto">
                <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">{selectedVeg.name}</h2>
                  <button
                    onClick={() => setSelectedVeg(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <img
                    src={
                      selectedVeg?.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={selectedVeg.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />

                  <div className="bg-[#2D775C]/5 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-[#2D775C]">
                      Farmer Details
                    </h3>
                    <div className="grid gap-3">
                      <p className="font-medium text-gray-900">
                        {selectedVeg.farmer}
                      </p>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{selectedVeg.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{selectedVeg.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Map className="h-4 w-4" />
                        <span>{selectedVeg.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Price</p>
                      <p className="font-semibold text-lg">
                        {selectedVeg.price}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Quantity</p>
                      <p className="font-semibold text-lg">
                        {selectedVeg.quantity}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Quality</p>
                      <p className="font-semibold text-lg">
                        {selectedVeg.quality}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Harvest Date</p>
                      <p className="font-semibold text-lg">
                        {selectedVeg.harvestDate}
                      </p>
                    </div>
                  </div>

                  <button className="w-full bg-[#2D775C] hover:bg-[#2D775C]/90 text-white py-3 rounded-lg transition-colors font-medium">
                    Contact Farmer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerExplore;
