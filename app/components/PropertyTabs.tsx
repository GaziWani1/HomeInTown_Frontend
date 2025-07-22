// import { useState } from "react";

// export default function Tabs() {
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <div className="w-full max-w-xl mx-auto mt-2">
//       {/* Tab List */}
//       <ul className="flex justify-evenly border-b" role="tablist">
//         {["overview", "reviews", "about", "photos"].map((tab) => (
//           <li key={tab} className="mr-4" role="presentation">
//             <button
//               onClick={() => setActiveTab(tab)}
//               className={`pb-2 px-2 text-sm font-medium focus:outline-none transition duration-150 ease-in-out ${
//                 activeTab === tab
//                   ? "border-b-2 border-gray-800 text-gray-800"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//               role="tab"
//               aria-selected={activeTab === tab}
//               aria-controls={`${tab}-panel`}
//               id={`${tab}-tab`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Tab Content */}
//       <div className="mt-4 px-5" id="myTabContent">
//         {activeTab === "overview" && (
//           <div
//             id="overview-panel"
//             role="tabpanel"
//             aria-labelledby="overview-tab"
//           >
//             <p>Overview</p>
//           </div>
//         )}
//         {activeTab === "reviews" && (
//           <div id="reviews-panel" role="tabpanel" aria-labelledby="reviews-tab">
//             <p>Reviews</p>
//           </div>
//         )}
//         {activeTab === "about" && (
//           <div id="about-panel" role="tabpanel" aria-labelledby="about-tab">
//             <p>About</p>
//           </div>
//         )}
//         {activeTab === "photos" && (
//           <div id="photos-panel" role="tabpanel" aria-labelledby="photos-tab">
//             <p>Photos</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import PropertyDetails from "./PropertyDetails";
import Reviews from "./Reviews";
import Image from "next/image";

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

type Props = {
  property?: Property;
};

export default function PropertyTabs({ property }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  if (!property) return null;

  return (
    <>
      {/* Tabs */}
      <ul className="flex justify-evenly border-b mt-3" role="tablist">
        {["overview", "reviews", "about", "photos"].map((tab) => (
          <li key={tab} role="presentation">
            <button
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-2 text-sm font-medium transition duration-150 ease-in-out ${
                activeTab === tab
                  ? "border-b-2 border-gray-800 text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Content */}
      <div className="mt-4 space-y-4 px-2">
        {activeTab === "overview" && (
          <div>
            {property.title}
            <div className="grid grid-cols-2 gap-3">
              {property.photos.map((img: string, i: number) => (
                <Image
                  key={i}
                  src={img}
                  width={200}
                  height={200}
                  alt={`Photo ${i}`}
                  className="rounded w-full h-28 object-cover"
                />
              ))}
            </div>
            <PropertyDetails />

            <Reviews />
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <Reviews />
          </div>
        )}

        {activeTab === "about" && (
          <div>
            <PropertyDetails />
          </div>
        )}

        {activeTab === "photos" && (
          <div className="grid grid-cols-2 gap-3">
            {property.photos.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                width={200}
                height={200}
                alt={`Photo ${i}`}
                className="rounded w-full h-28 object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
