"use client";
import { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Map from "../main/map/Map";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { endSession } from "../lib/auth";

const DeviceLayout = ({ children }: { children: React.ReactNode }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 18.5524, lng: 73.8077 });
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery) return;
    if (searchQuery.trim()) {
      setShowBottomSheet(true);
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();

        setMapCenter({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
          mapRef.current.setZoom(20); // Added line to zoom in
        }
      } else {
        alert("Location not found.");
      }
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          if (mapRef.current) {
            mapRef.current.setCenter({ lat: latitude, lng: longitude });
            mapRef.current.setZoom(16);
          }
        },
        (error) => {
          console.warn("Geolocation permission denied or unavailable.", error);
          // Optional: keep default location (Pune)
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-screen">
      {!isMobile && (
        <Sidebar
          mapRef={mapRef}
          setMapCenter={setMapCenter}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <Map
        mapRef={mapRef}
        mapCenter={mapCenter}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
      />
      <main className="hidden">{children}</main>
      <button
        onClick={() => {
          endSession();
          router.push("/login");
        }}
        className="fixed top-4 right-4 z-50 bg-white rounded-full shadow-lg p-2 hover:bg-red-100 transition"
        title="Logout"
      >
        <AiOutlineLogout />
      </button>
    </div>
  );
};

export default DeviceLayout;
