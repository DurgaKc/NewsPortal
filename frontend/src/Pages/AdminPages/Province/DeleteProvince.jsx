import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProvince } from "./ProvinceApi";

const DeleteProvince = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete province data");
        setLoading(false);
        return;
      }

      await deleteProvince(id, token); // call API with token
      toast.success("Province data deleted successfully");

      if (onClose) onClose(); // close dialog & refresh list if needed
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete province data. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this province data? This action cannot
        be undone.
      </Typography>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#1976d2", // Blue
            color: "white",
            "&:hover": {
              backgroundColor: "#115293", // Darker blue on hover
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#d32f2f", // red
            color: "white",
            "&:hover": {
              backgroundColor: "#b71c1c", // dark red on hover
            },
          }}
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteProvince;
