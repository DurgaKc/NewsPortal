import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteInterview } from "./InterviewApi";

const DeleteInterview = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete an interview");
        setLoading(false);
        return;
      }

      await deleteInterview(id, token);
      toast.success("Interview deleted successfully");

      if (onClose) onClose(); // Close dialog & refresh list
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete interview. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this interview? This action cannot be
        undone.
      </Typography>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button variant="contained" size="small" 
        sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#115293", 
            },
          }}
        onClick={onClose}>
          
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", backgroundColor: "#d32f2f" }}
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteInterview;
