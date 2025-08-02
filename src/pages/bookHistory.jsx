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
import Avatar from "@mui/material/Avatar";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
export default function Bookhistory() {
  function convertDateToString(dateString) {
    const date = new Date(dateString); // Parse the date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    const formattedDate = `${year}-${month}-${day}`; // Format the date string
    return formattedDate;
  }
  const auth = useAuthUser();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet();
  }, []);

  //   const UsersGet = () => {
  //     fetch("http://localhost:8000/users")
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setUsers(result);
  //       });
  //   };
  const UsersGet = () => {
    // Get the JWT token from the cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      console.error("Missing JWT token in cookie");
      return; // Handle missing token scenario (e.g., redirect to login)
    }
    // console.log("cookieValue", cookieValue);
    // console.log("token", token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8000/booking/dashboardlist/${auth.branchId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.log("error", error));
  };

  // const UpdateUser = (id) => {
  //   window.location = "/update/" + id;
  // };

  // const UserDelete = (id) => {
  //   const cookieValue = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("_auth="));
  //   const token = cookieValue ? cookieValue.split("=")[1] : null;

  //   if (!token) {
  //     console.error("Missing JWT token in cookie");
  //     return; // Handle missing token scenario (e.g., redirect to login)
  //   }

  //   const myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`http://localhost:8000/users/${id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       // setUsers(result);
  //       UsersGet();
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      <div className="relative">
        {/* <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        /> */}
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          กรองด้วยวันที่
        </label>
        <Box style={{ padding: "0px" }}>
          {/* <Tygography variant="h5">Date picker mui</Tygography> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Select Date"}
              // onChange={handleDatepromotion}
              // value={selectedDatepromotion}
            ></DatePicker>
          </LocalizationProvider>
        </Box>
      </div>
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ตาราง : รายการที่ถูกจองเข้ามา
              {/* http://localhost:8000/booking/dashboardlist/4 */}
            </Typography>
          </Box>
          <Box>
            <Link to="/admin/form">
              <Button variant="contained" color="primary">
                เปิดการจองโต๊ะ
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">userID</TableCell>
                <TableCell align="center">วันที่</TableCell>
                <TableCell align="center">ชื่อผู้จอง</TableCell>
                <TableCell align="center">เบอร์ติดต่อ</TableCell>
                <TableCell align="center">โต๊ะที่</TableCell>
                {/* <TableCell align="left">ที่นั่งทั้งหมด</TableCell> */}
                <TableCell align="center">จำนวนที่จอง (ที่นั่ง)</TableCell>
                <TableCell align="center">สถานะ</TableCell>
                <TableCell align="center">ยกเลิกการจอง</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell align="center">{user.userId}</TableCell>
                  <TableCell align="center">
                    {convertDateToString(user.datereserve)}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Avatar src={user.avatar} />
                      <span style={{ marginLeft: 5 }}>
                        {user.username}
                      </span>{" "}
                      {/* Added span with margin */}
                    </Box>
                  </TableCell>

                  <TableCell align="center">{user.phone}</TableCell>
                  <TableCell align="center">{user.tablenumbername}</TableCell>
                  <TableCell align="center">{user.maxseat}</TableCell>
                  <TableCell align="center">
                    รอลูกค้าเช็คอิน
                    {/* <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                      <Button onClick={() => UserDelete(user.id)}>Del</Button>
                    </ButtonGroup> */}
                  </TableCell>
                  <TableCell align="center">
                    <label class="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="checked"
                        class="sr-only peer"
                        // checked={userisActive[index]} // Set checked based on state
                        // onChange={(event) =>
                        //   handleChangeisActive(event, index, user.redeemhisId)
                        // }
                      />

                      <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                    </label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
