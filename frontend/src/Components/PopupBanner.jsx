import { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { getPopupAdvertisements } from "../Pages/AdminPages/Advertisement/AdvertisementApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PopupBanner = () => {
  const [popupData, setPopupData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        setLoading(true);
        const res = await getPopupAdvertisements();
        console.log('🎯 Popup API Full Response:', res);
        console.log('📊 Response data:', res?.data);
        console.log('🔢 Number of popups found:', res?.data?.length);

        if (res?.data?.length > 0) {
          const popup = res.data[0];
          console.log(' Popup data found:', popup);
          console.log(' Image path:', `${backendUrl}/images/${popup.image}`);
          console.log(' Popup status:', popup.Popup);
          console.log(' General status:', popup.status);
          
          setPopupData(popup);
          setAnchorEl(document.body);
        } else {
          console.log(' No active popup advertisements found');
        }
      } catch (err) {
        console.error(' Error fetching popup:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  if (loading) {
    return <div>Loading popup...</div>;
  }

  if (!popupData) {
    console.log('No popup data available');
    return null;
  }

  console.log('🎨 Rendering popup with data:', popupData);

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
            maxWidth: 400,
            maxHeight: 400,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          },
        }}
      >
        <div style={{ position: "relative" }}>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255,255,255,0.9)",
              zIndex: 10,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <img
            src={`${backendUrl}/images/${popupData.image}`}
            alt="Advertisement Popup"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              display: "block",
            }}
            onError={(e) => {
              console.error('Error loading image:', e);
              console.error('Failed image URL:', `${backendUrl}/images/${popupData.image}`);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('✅ Image loaded successfully');
            }}
          />
        </div>
      </Popover>
    </div>
  );
};

export default PopupBanner;
