import {
  FaWifi,
  FaParking,
  FaSwimmer,
  FaDumbbell,
  FaSmokingBan,
  FaWheelchair,
  FaCoffee,
  FaUtensils,
  FaBaby,
  FaSnowflake,
  FaDog,
  FaShower,
} from "react-icons/fa";
import { MdRoomService, MdBusinessCenter } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { GiWorld } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";

export default function PropertyDetails() {
  return (
    <div className="p-2 text-sm text-gray-800">
      {/* Details Section */}
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-1">Details</h2>
        <p className="text-gray-700 mb-1">
          Down-to-earth rooms, some with balconies, in a no-nonsense hotel
          featuring Wi-Fi.
        </p>
      </div>

      {/* Address */}
      <div className="border-t text-gray-700 space-y-3">
        <div className="flex items-center gap-2 mb-1 py-2 border-b">
          <TfiLocationPin size={25} />
          <p>
            DP Rd, opp. DAV Public School, Harmony Society,
            <br />
            Ward No. 8, Wireless Colony, Aundh, Pune, Maharastra, 411007
          </p>
        </div>

        <div className="flex items-center gap-2 text-blue-600 cursor-pointer border-b py-2 mb-1">
          <CiEdit size={16} />
          <span>Suggest an edit</span>
        </div>
        <div className="flex items-center gap-2 text-blue-600 cursor-pointer border-b py-2">
          <GiWorld size={16} />
          <span>Add Website</span>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-5">
        <h2 className="font-semibold text-gray-900 mb-2">Amenities</h2>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700">
          <div className="flex items-center gap-2">
            <FaWifi className="text-lg" /> Free Wi-Fi
          </div>
          <div className="flex items-center gap-2">
            <FaCoffee className="text-lg" /> Free Breakfast
          </div>
          <div className="flex items-center gap-2">
            <FaParking className="text-lg" /> Free Parking
          </div>

          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaWheelchair className="text-lg" /> Accessible
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaSwimmer className="text-lg" /> Pool
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaSnowflake className="text-lg" /> Air-conditioned
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaShower className="text-lg" /> Laundry service
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <MdBusinessCenter className="text-lg" /> Business centre
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaDog className="text-lg" /> Pet-friendly
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <MdRoomService className="text-lg" /> Room service
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaUtensils className="text-lg" /> Restaurant
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaBaby className="text-lg" /> Child friendly
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaDumbbell className="text-lg" /> Fitness centre
          </div>
          <div className="flex items-center gap-2 opacity-40 line-through">
            <FaSmokingBan className="text-lg" /> Smoke-free
          </div>
        </div>
      </div>
    </div>
  );
}
