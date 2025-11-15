import React, { useState, useEffect } from "react";
import { IoAddSharp } from "react-icons/io5";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  Tooltip,
  Dialog,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditAdvertisement from "./EditAdvertisement";
import DeleteAdvertisement from "./DeleteAdvertisement";
import { getAllAdvertisements } from "./AdvertisementApi";

const ViewAdvertisement = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [adData, setAdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Fetch advertisements from API
  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const res = await getAllAdvertisements();
      console.log("API response:", res.data);
      setAdData(res.data);
    } catch (err) {
      console.error("Error fetching advertisements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    fetchAdvertisements(); 
  };

  const handleEdit = (id) => {
    setSelectedAdId(id);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    setSelectedAdId(id);
    setOpenDeleteDialog(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const trimDescription = (text, wordLimit = 15) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <Grid>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 6, mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        List of Advertisements
      </Typography>

      {/* Add Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 12 }}>
        <Link to="/admin/advertisement/addadvertisement" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<IoAddSharp />}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#115293" },
              textTransform: "none",
              fontWeight: 500,
              py: "2px",
              px: "12px",
              mr: "60px",
            }}
          >
            Add Advertisement
          </Button>
        </Link>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1100, mx: "auto", boxShadow: 3, borderRadius: 2, mb: 2 }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(43, 110, 181)" }}>
            <TableRow>
              {["S.No", "Topic", "Description", "Date", "Action"].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{ color: "white", border: "1px solid #c2c2c2", p: 1 }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {adData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2", fontWeight: 500 }}>
                    {item.topic}
                  </TableCell>
                  <TableCell>
                    <Tooltip topic={item.description}>
                      <span>{trimDescription(item.description)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>{item.date}</TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2", display: "flex" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mx: 0.5,
                        my: 0.5,
                        textTransform: "none",
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": { backgroundColor: "#115293" },
                      }}
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        mx: 0.5,
                        my: 0.5,
                        backgroundColor: "#d32f2f",
                        color: "white",
                        "&:hover": { backgroundColor: "#b71c1c" },
                        textTransform: "none",
                      }}
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <TablePagination
            component="div"
            count={adData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </Box>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <EditAdvertisement id={selectedAdId} onClose={handleCloseDialog} />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DeleteAdvertisement id={selectedAdId} onClose={handleCloseDialog} />
      </Dialog>
    </Grid>
  );
};

export default ViewAdvertisement;
