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
import EditPolitics from "./EditPolitics";
import DeletePolitics from "./DeletePolitics";
import { getAllPolitics } from "./PoliticsApi";

const ViewPolitics = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // Fetch news from API
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await getAllPolitics();
      setNewsData(res.data);
    } catch (err) {
      console.error("Error fetching politics news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    fetchNews(); // refresh after edit/delete
  };

  const handleEdit = (id) => {
    setSelectedNewsId(id);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    setSelectedNewsId(id);
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
        List of Politics News
      </Typography>

      {/* Add Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 12 }}>
        <Link to="/admin/politics/addpolitics" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<IoAddSharp />}
            sx={{
              color: "#2B6EB5",
              borderColor: "#2B6EB5",
              textTransform: "none",
              fontWeight: 500,
              py: "2px",
              px: "12px",
              mr: "60px",
            }}
          >
            Add Political News
          </Button>
        </Link>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1100,
          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(43, 110, 181)" }}>
            <TableRow>
              {["S.No", "Topic", "Description", "Date", "Action"].map(
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
            {newsData
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
                    <Tooltip title={item.description}>
                      <span>{trimDescription(item.description)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.date}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2", display: "flex" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mx: 0.5, my: 0.5, textTransform: "none" }}
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mx: 0.5,
                        my: 0.5,
                        color: "red",
                        borderColor: "red",
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
            count={newsData.length}
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
        <EditPolitics id={selectedNewsId} onClose={handleCloseDialog} />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DeletePolitics id={selectedNewsId} onClose={handleCloseDialog} />
      </Dialog>
    </Grid>
  );
};

export default ViewPolitics;
