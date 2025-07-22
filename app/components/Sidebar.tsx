"use client";
import React from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Tabs from "./tabs";

interface SidebarProps {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  setMapCenter: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  handleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleSearch,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="w-[400px] bg-white border-r overflow-auto">
      {/* Image Section with overlay */}
      <div className="relative">
        <Image
          src="/property.jpg"
          alt="Hotel"
          width={400}
          height={250}
          className="mb-2 object-cover"
        />

        {/* Search bar on top of image */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-full px-4 py-2 w-[90%] flex items-center shadow-md">
          <CiSearch
            className="text-gray-500 mr-2 cursor-pointer"
            size={18}
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <IoMdClose className="text-gray-500 ml-2" size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="px-5 py-4">
        <h2 className="text-xl font-semibold mb-2">The Paradise Aundh</h2>
        <p className="text-sm mb-1">⭐ 4.0 (478 reviews)</p>
      </div>

      {/* Tabs */}
      <Tabs />
    </div>
  );
};

export default Sidebar;
