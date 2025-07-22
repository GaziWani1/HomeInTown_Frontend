import { useState } from "react";
import PropertyDetails from "./PropertyDetails";
import Reviews from "./Reviews";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full max-w-xl mx-auto mt-2">
      {/* Tab List */}
      <ul className="flex justify-evenly border-b" role="tablist">
        {["overview", "reviews", "about", "photos"].map((tab) => (
          <li key={tab} className="mr-4" role="presentation">
            <button
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-2 text-sm font-medium focus:outline-none transition duration-150 ease-in-out ${
                activeTab === tab
                  ? "border-b-2 border-gray-800 text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-panel`}
              id={`${tab}-tab`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="mt-4 px-5" id="myTabContent">
        {activeTab === "overview" && (
          <div
            id="overview-panel"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <PropertyDetails />
            <Reviews />
          </div>
        )}
        {activeTab === "reviews" && (
          <div id="reviews-panel" role="tabpanel" aria-labelledby="reviews-tab">
            <Reviews />
          </div>
        )}
        {activeTab === "about" && (
          <div id="about-panel" role="tabpanel" aria-labelledby="about-tab">
            <PropertyDetails />
          </div>
        )}
        {activeTab === "photos" && (
          <div id="photos-panel" role="tabpanel" aria-labelledby="photos-tab">
            <p>Photos</p>
          </div>
        )}
      </div>
    </div>
  );
}
