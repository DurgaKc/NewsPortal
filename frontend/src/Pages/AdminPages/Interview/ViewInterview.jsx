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
import EditInterview from "./EditInterview";
import DeleteInterview from "./DeleteInterview"
import { getAllInterview } from "./InterviewApi";

const ViewInterview = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch interviews from API
  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const res = await getAllInterview();
      setInterviewData(res);
    } catch (err) {
      console.error("Error fetching interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    fetchInterviews(); // refresh after edit/delete
  };

  const handleEdit = (id) => {
    setSelectedInterviewId(id);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    setSelectedInterviewId(id);
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
        List of Interviews
      </Typography>

      {/* Add Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mr: 12 }}>
        <Link
          to="/admin/interview/addinterview"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            startIcon={<IoAddSharp />}
            sx={{
              color: "#2B6EB5",
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: 500,
              py: "2px",
              px: "12px",
              mr: "60px",
              color: "white",
            }}
          >
            Add Interview
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
            {interviewData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #c2c2c2", fontWeight: 500 }}
                  >
                    {item.topic}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={item.description}>
                      <span>{trimDescription(item.description)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #c2c2c2" }}>
                    {item.date?.split("T")[0]}
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid #c2c2c2", display: "flex" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleEdit(item._id)}
                      sx={{
                        mx: 0.5,
                        my: 0.5,
                        textTransform: "none",
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#115293",
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                     onClick={() =>handleDelete(item._id)}
                      sx={{
                        mx: 0.5,
                        my: 0.5,
                        textTransform: "none",
                        backgroundColor: "#d32f2f", // red
                        color: "white"
                        
                      }}
                       
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
            count={interviewData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <EditInterview id={selectedInterviewId} onClose={handleCloseDialog} />
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DeleteInterview id={selectedInterviewId} onClose={handleCloseDialog} />
      </Dialog>
    </Grid>
  );
};

export default ViewInterview;
