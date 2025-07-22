"use client";
import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";

import Sidebar from "./Sidebar";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 18.5204, // Pune coordinates
  lng: 73.8567,
};

const libraries: Libraries = ["places"];

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <>
      {/* Assuming Sidebar is defined/imported elsewhere */}
      <Sidebar
        mapRef={mapRef}
        setMapCenter={setMapCenter}
        handleSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
        searchQuery={""}
        setSearchQuery={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <GoogleMap
        center={mapCenter}
        zoom={13}
        mapContainerStyle={containerStyle}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </>
  );
};

export default React.memo(MapView);
