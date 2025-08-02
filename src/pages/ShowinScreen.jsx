import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function ShowinScreen() {
  const auth = useAuthUser();
  const [displays, setDisplays] = useState([]);
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/playlistdisplay", {
      state: { someData: displays },
    });
  };

  useEffect(() => {
    fetchDisplays();
  }, []);

  const fetchDisplays = async () => {
    try {
      // Get the JWT token from the cookie
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_auth="));
      const token = cookieValue ? cookieValue.split("=")[1] : null;

      if (!token) {
        console.error("Missing JWT token in cookie");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/display?branchId=${auth.branchId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDisplays(data.result);
    } catch (error) {
      console.error("Error fetching display data:", error);
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการแสดงบนหน้าจอร้านค้า ({formattedDate}){" "}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={goToNextPage}>
              เล่นรายการเต็มจอ
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">รูปภาพที่ส่งมา</TableCell>
                <TableCell align="left">ข้อความ</TableCell>
                <TableCell align="center">ชื่อผู้ส่ง</TableCell>
                {/* <TableCell align="center">สาขา ID</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {displays.map((display) => (
                <TableRow key={display.displayId}>
                  <TableCell align="right">{display.displayId}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <img
                        src={display.displayimage}
                        className="h-48 w-64"
                        alt="Display"
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      maxWidth: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {display.displaytext}
                  </TableCell>
                  <TableCell align="center">{display.username}</TableCell>
                  {/* <TableCell align="center">{display.branchId}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
