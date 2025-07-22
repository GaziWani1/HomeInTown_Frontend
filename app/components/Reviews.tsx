import {
  FaStar,
  FaSortAmountDown,
  FaChevronDown,
  FaSearch,
  FaPencilAlt,
} from "react-icons/fa";

export default function Reviews() {
  const filters = [
    { label: "service", count: 33 },
    { label: "price", count: 18 },
    { label: "budget", count: 17 },
    { label: "money", count: 12 },
    { label: "clean rooms", count: 10 },
    { label: "hygienic", count: 10 },
    { label: "labradors", count: 8 },
    { label: "cooperative", count: 7 },
    { label: "value", count: 6 },
    { label: "wifi", count: 5 },
  ];

  return (
    <div className="p-2 text-gray-800 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className=" gap-1 text-lg font-semibold">
            <span className="text-7xl">4.0</span>
            <div className="flex justify-evenly">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500">478 reviews</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded shadow">
          <FaPencilAlt size={12} />
          Write a review
        </button>
      </div>

      {/* Sort + Filter */}
      <div className="flex justify-between items-center text-xs mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          <FaSortAmountDown />
          <span>Sort</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-gray-600 cursor-pointer">
          <span>All</span>
          <FaChevronDown size={10} />
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center bg-gray-100 px-2 py-1 rounded mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search reviews"
          className="flex-grow bg-transparent text-sm outline-none text-gray-800"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 text-xs">
        {filters.map((item) => (
          <span
            key={item.label}
            className="bg-gray-200 rounded-full px-3 py-1 text-gray-700"
          >
            {item.label} ({item.count})
          </span>
        ))}
      </div>

      {/* Optional: Add actual reviews below */}
    </div>
  );
}
