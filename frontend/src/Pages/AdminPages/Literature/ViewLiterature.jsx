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
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditLiterature from "./EditLiterature";
import DeleteLiterature from "./DeleteLiterature";
import { getAllLiterature } from "./LiteratureApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewLiterature = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [literatureData, setLiteratureData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch all literature data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllLiterature();
      setLiteratureData(res.data);
    } catch (err) {
      console.error("Error fetching literature:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    fetchData(); // refresh data after update/delete
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const trimText = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <Grid>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 6, mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        List of Literature
      </Typography>

      {/* Add Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 12 }}>
        <Link to="/admin/literature/addliterature" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
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
            Add Literature
          </Button>
        </Link>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(43, 110, 181)" }}>
            <TableRow>
              {["S.No", "Topic", "Category", "Author", "Description", "Date", "Action"].map(
                (heading) => (
                  <TableCell
                    key={heading}
                    sx={{ color: "white", border: "1px solid #c2c2c2", p: 1 }}
                  >
                    {heading}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {literatureData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>

                  {/* Topic */}
                  <TableCell sx={{ border: "1px solid #c2c2c2", fontWeight: 500 }}>
                    {item.topic}
                  </TableCell>

                  {/* Category */}
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.category}
                  </TableCell>

                  {/* Author */}
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.author}
                  </TableCell>

                  {/* Description */}
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    <Tooltip title={item.description}>
                      <span>{trimText(item.description)}</span>
                    </Tooltip>
                  </TableCell>

                  {/* Date */}
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.date}
                  </TableCell>

                  {/* Actions */}
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

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <TablePagination
            component="div"
            count={literatureData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Box>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <EditLiterature id={selectedId} onClose={handleCloseDialog} />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DeleteLiterature id={selectedId} onClose={handleCloseDialog} />
      </Dialog>
    </Grid>
  );
};

export default ViewLiterature;
