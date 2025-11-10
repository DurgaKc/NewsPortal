import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteNews } from "./InterApi";

const DeleteInternational = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      await deleteNews(id, token); // use the id prop directly
      toast.success("News deleted successfully");

      if (onClose) onClose(); // close dialog & optionally refresh list
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete news. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this news? This action cannot be undone.
      </Typography>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button
          variant="outlined"
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
          onClick={handleDelete} // use handleDelete directly
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteInternational;
