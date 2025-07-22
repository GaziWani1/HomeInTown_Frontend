"use client";

import React, { useRef, useState } from "react";
import Map from "./Map";

const MapComp = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter] = useState({ lat: 0, lng: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleSearch = () => {
    // implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <Map
      mapRef={mapRef}
      mapCenter={mapCenter}
      handleSearch={handleSearch}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      showBottomSheet={showBottomSheet}
      setShowBottomSheet={setShowBottomSheet}
    />
  );
};

export default MapComp;
