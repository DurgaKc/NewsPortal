import { Button, DialogActions, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteLocalGovernment } from "./LocalGovernmentApi"; // ✅ correct import

const DeleteLocalGovernment = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete local government news");
        setLoading(false);
        return;
      }

      await deleteLocalGovernment(id, token); // ✅ API call
      toast.success("Local Government news deleted successfully");

      if (onClose) onClose(); // ✅ close dialog & refresh list if needed
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete Local Government news. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this Local Government news? This action
        cannot be undone.
      </Typography>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "red", borderColor: "red" }}
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteLocalGovernment;
