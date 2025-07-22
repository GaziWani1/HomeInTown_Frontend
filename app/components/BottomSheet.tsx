"use client";

import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { LuConstruction, LuSlidersHorizontal } from "react-icons/lu";
import {
  FaBookmark,
  FaDirections,
  FaPhoneAlt,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import PropertyTabs from "./PropertyTabs";
import { MdConstruction } from "react-icons/md";
import { HiOutlineArrowsExpand, HiOutlineClipboardList } from "react-icons/hi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { GiResize } from "react-icons/gi";
import { LiaIndustrySolid } from "react-icons/lia";
import {
  HiOutlineSquares2X2,
  HiOutlineViewfinderCircle,
} from "react-icons/hi2";
import Image from "next/image";

const mockProperties = [
  {
    id: 1,
    title: "Pritiyog Property",
    price: "₹ 4,90,000",
    info: "Pritiyog property real estate consultant good services.",
    image: "/property.jpg",
    rating: 4.9,
    reviews: 349,
    overview: "Down-to-earth rooms, some with balconies, featuring Wi-Fi.",
    about:
      "DP Rd, opp. DAV Public School, Harmony Society, Aundh, Pune, Maharashtra",
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Parking", "Gym"],
    photos: ["/property.jpg", "/property.jpg", "/property.jpg"],
  },
];
type Property = {
  id: number;
  title: string;
  price: string;
  info: string;
  image: string;
  rating: number;
  reviews: number;
  overview: string;
  about: string;
  amenities: string[];
  photos: string[];
  location?: string;
};

export default function BottomSheet() {
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [sheetHeight, setSheetHeight] = useState(70); // in vh

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!startY.current) return;
      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      const newHeight = Math.max(
        30,
        Math.min(85, sheetHeight - (deltaY / window.innerHeight) * 100)
      );
      setSheetHeight(newHeight);
    };

    const handleTouchEnd = () => {
      // Snap to levels
      if (sheetHeight < 45) {
        setSheetHeight(30);
      } else if (sheetHeight > 75) {
        setSheetHeight(85);
      } else {
        setSheetHeight(60);
      }

      // reset refs
      startY.current = 0;
      currentY.current = 0;
    };

    const sheet = sheetRef.current;
    if (sheet) {
      sheet.addEventListener("touchmove", handleTouchMove);
      sheet.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (sheet) {
        sheet.removeEventListener("touchmove", handleTouchMove);
        sheet.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [sheetHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  return (
    <>
      {showBottomSheet && (
        <div
          ref={sheetRef}
          onTouchStart={handleTouchStart}
          className="fixed bottom-0 left-0 w-full bg-white rounded-t-xl shadow-xl z-50 p-4 overflow-auto transition-all animate-slide-up"
          style={{ height: `${sheetHeight}vh` }}
        >
          {/* Drag handle */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3 sticky top-0 " />

          {/* ---------- SHEET HEADER (LIST MODE ONLY) ---------- */}
          {!selectedProperty && (
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">Project</h2>
              <button
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                onClick={() => setShowBottomSheet(false)}
              >
                <IoMdClose size={18} />
              </button>
            </div>
          )}

          {/* ---------- LIST MODE ---------- */}
          {!selectedProperty && (
            <>
              <div className="flex items-center gap-2 mb-3">
                <LuSlidersHorizontal className="text-gray-600" size={18} />
                {["Price", "Available", "Type", "New"].map((label) => (
                  <button
                    key={label}
                    className="text-xs px-3 py-1 rounded bg-gray-100 text-gray-700"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {mockProperties.map((prop) => (
                  <div key={prop.id} className="flex gap-4">
                    <Image
                      src={prop.image}
                      width={200}
                      height={200}
                      alt="Property"
                      className="w-24 max-h-full object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{prop.title}</h3>
                      <p className="text-xs text-gray-600">{prop.info}</p>
                      <p className="text-sm text-green-600">{prop.price}</p>
                      <div className="mt-1 flex gap-2 text-sm text-blue-600">
                        <button
                          onClick={() => setSelectedProperty(prop)}
                          className="text-sm bg-blue-100 px-2 py-1 flex items-center rounded"
                        >
                          <HiOutlineViewfinderCircle className="me-2" />
                          View
                        </button>
                        <button className="text-sm bg-blue-100 px-2 py-1 flex items-center  rounded">
                          <FaWhatsapp className="me-2" />
                          Chat
                        </button>
                        <button className="text-sm bg-blue-100 px-2 py-1 flex items-center  rounded">
                          <FaPhoneAlt className="me-2" />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ---------- DETAIL MODE ---------- */}
          {selectedProperty && (
            <>
              {/* Title + 3 icons (bookmark / share / close) */}
              <div className="flex justify-between items-start">
                <div>
                  {/* Optional parent name line — change/remove as needed */}
                  <h2 className="text-lg font-bold text-black leading-tight">
                    {selectedProperty.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Pritiyog property real estate consultant good services.
                  </p>
                  <div className="flex gap-2">
                    <div className="text-green-700 font-semibold text-base mt-1">
                      {selectedProperty.price}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <span>⭐ {selectedProperty.rating}</span>
                      <span>({selectedProperty.reviews})</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Apartment Complex
                  </p>
                </div>

                {/* Actions stacked like screenshot */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      <FaBookmark size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      <FaShareAlt size={16} />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700"
                      onClick={() => setSelectedProperty(null)} // <-- back to list
                    >
                      <IoMdClose size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Download Brochure right-aligned */}
              <div className="mt-3 flex justify-end">
                <button className="text-xs text-white bg-blue-600 px-3 py-1.5 rounded-md shadow flex items-center gap-1">
                  <BsFileEarmarkArrowDown size={14} />
                  Download Brochure
                </button>
              </div>

              {/* Project Info Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs py-2 text-gray-700">
                <div>
                  <strong className="flex items-center">
                    <HiOutlineArrowsExpand className="me-2" />
                    Project Area
                  </strong>
                  <h4>3 Acres</h4>
                </div>
                <div>
                  <strong className="flex items-center">
                    <GiResize className="me-2" />
                    Size
                  </strong>
                  <h4>1150 - 1570 sq. ft.</h4>
                </div>
                <div>
                  <strong className="flex items-center">
                    <LiaIndustrySolid className="me-2" />
                    Project Size
                  </strong>
                  <h4>4 Buildings 304 Units</h4>
                </div>
                <div>
                  <strong className="flex items-center">
                    <HiOutlineSquares2X2 className="me-2" />
                    Configurations
                  </strong>
                  <h4>2, 3 BHK Apartments</h4>
                </div>
                <div>
                  <strong className="flex items-center">🧾 RERA ID</strong>
                  <h4>P02500007</h4>
                </div>
                <div>
                  <strong className="flex items-center">
                    <LuConstruction className="me-2" />
                    Possession
                  </strong>
                  <h4>Under Construction</h4>
                </div>
              </div>

              {/* Action Buttons (scrollable row) */}
              <div className="flex gap-2 mt-3 overflow-x-auto whitespace-nowrap">
                <button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <FaDirections size={12} />
                  Directions
                </button>
                <button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <HiOutlineClipboardList size={12} />
                  Availability
                </button>
                <button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <MdConstruction size={12} />
                  Construction Status
                </button>
                <button className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  ✅ Booking Status
                </button>
              </div>

              {/* Property Image Grid */}
              <div className="grid grid-cols-3 gap-2 py-2">
                {selectedProperty.photos
                  .slice(0, 3)
                  .map((photo: string, idx: number) => (
                    <Image
                      key={idx}
                      src={photo}
                      alt="Property"
                      width={200}
                      height={200}
                      className="rounded-md object-cover h-24 w-full"
                    />
                  ))}
              </div>
              {/* Call / WhatsApp */}
              <div className="mt-5 flex justify-around text-center text-blue-600 gap-2">
                <button className="bg-blue-100 text-blue-700 flex items-center justify-center rounded  gap-1 p-2 w-full">
                  <FaPhoneAlt />
                  Call
                </button>
                <button className="bg-blue-100 text-blue-700 flex items-center justify-center rounded gap-1 p-2 w-full">
                  <FaWhatsapp />
                  WhatsApp
                </button>
              </div>
              {/* Tabs */}
              <PropertyTabs property={selectedProperty} />
            </>
          )}
        </div>
      )}
    </>
  );
}
