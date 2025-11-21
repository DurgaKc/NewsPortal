import { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { getPopupAdvertisements } from "../Pages/AdminPages/Advertisement/AdvertisementApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function PopupBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  // In PopupBanner.js - Fix the isExpired function
const isExpired = (date) => {
  if (!date) return false;
  const adDate = new Date(date).toISOString().split('T')[0];
  return adDate < today;
};

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching popup ads...');
        const { data } = await getPopupAdvertisements();
        console.log('Raw API response:', data);

        const valid = data
          .filter(
            (item) =>
              item.status === "active" &&
              item.Popup === "active" &&
              item.image &&
              !isExpired(item.date)
          )
         .sort((a, b) => new Date(b.date) - new Date(a.date));

console.log('Filtered popups:', valid);
        setPopups(valid);
        setIsVisible(valid.length > 0);
      } catch (err) {
        console.error("Popup fetch error:", err);
      }
    }

    fetchData();
  }, []);

 console.log('PopupBanner state:', { isVisible, popups, currentIndex });

  if (!isVisible || popups.length === 0) {
    console.log('Popup not rendered - condition not met');
    return null;
  }

  const ad = popups[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={closePopup} />

      <div className="relative w-[520px] h-[600px] bg-white rounded-xl shadow-xl overflow-hidden z-20">
        <div className="relative p-3 border-b bg-white">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            onClick={closePopup}
          >
            <IoIosCloseCircle className="text-3xl" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800 pr-10">
            {ad.topic}
          </h3>
        </div>

        <div className="flex-1 overflow-auto">
          <img
            src={`${backendUrl}/images/${ad.image}`}
            className="w-full h-auto object-contain p-4"
            alt="popup"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        </div>

        {popups.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {popups.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default PopupBanner;
