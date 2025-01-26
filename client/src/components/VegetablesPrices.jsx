import { useState, useEffect } from "react";
import axios from "axios";

const VegetablePrices = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/vegetable-prices`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log(response);

        if (response?.data?.Result?.data) {
          setPrices(response?.data?.Result?.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch prices");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [baseUrl]);

  const filteredPrices = prices?.filter((price) =>
    price.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPrices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPrices = filteredPrices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Vegetable Prices</h2>
        <input
          type="text"
          placeholder="Search vegetables..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-1 border rounded-lg w-48"
        />
      </div>

      <div className="space-y-3">
        {currentPrices.map((price, idx) => (
          <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{price.name}</h3>
              <div className="flex gap-4">
                <span className="text-green-600">₹{price.minPrice}</span>
                <span className="text-red-600">₹{price.maxPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 pt-2 border-t">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
        >
          ←
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default VegetablePrices;
