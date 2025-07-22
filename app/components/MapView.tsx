"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Sidebar from "./Sidebar";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultCenter = {
  lat: 18.5204,
  lng: 73.8567,
};

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-maps-script")) return resolve();

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load Google Maps.");
    document.body.appendChild(script);
  });
};

const MapView = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("google_maps_api_key");

    if (!apiKey) {
      console.error("No API key found. Redirect to login.");
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => setIsMapReady(true))
      .catch(console.error);
  }, []);

  if (!isMapReady) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <AiOutlineLoading3Quarters className="text-4xl text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Sidebar
        mapRef={mapRef}
        setMapCenter={setMapCenter}
        handleSearch={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
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

export default MapView;
