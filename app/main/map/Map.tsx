"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import BottomSheet from "@/app/components/BottomSheet";

const containerStyle = {
  width: "100%",
  height: "100%",
};
interface MapProps {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  mapCenter: { lat: number; lng: number };
  handleSearch: () => void;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  showBottomSheet: boolean;
  setShowBottomSheet: (val: boolean) => void;
}

const Map: React.FC<MapProps> = ({
  mapRef,
  mapCenter,
  searchQuery,
  setSearchQuery,
  handleSearch,
  showBottomSheet,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (mapRef?.current) {
      mapRef.current.panTo(mapCenter);
    }
  }, [mapCenter, mapRef]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative w-full h-full">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={16}
          onLoad={(map) => {
            if (mapRef) mapRef.current = map;
          }}
          options={{ disableDefaultUI: true }}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      )}

      {/* Mobile Top UI */}
      {isMobile && (
        <div className="absolute top-0 left-0 w-full px-4 pt-4 z-10 ">
          {/* Search wrapper relative so buttons flow below */}
          <div className="relative w-full">
            {/* Search Bar */}
            <div className="bg-white/90 rounded-full px-4 py-2 w-full flex items-center shadow-md">
              <CiSearch
                className="text-gray-500 mr-2 cursor-pointer"
                size={18}
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search Area, City, Town"
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

            {/* Filter Buttons */}
            <div
              className="flex gap-2 mt-3 overflow-x-auto whitespace-nowrap overflow-visible"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
              // Hide scrollbar for Webkit browsers (Chrome, Safari)
              onWheel={(e) => e.stopPropagation()}
            >
              {[
                "Flat",
                "Plot",
                "Rent",
                "Independent House",
                "Commercial Property",
              ].map((label) => (
                <button
                  key={label}
                  className="text-xs px-3 py-1 rounded-full bg-white shadow inline-block"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet for Mobile */}
      {isMobile && showBottomSheet && <BottomSheet />}
    </div>
  );
};

export default Map;
