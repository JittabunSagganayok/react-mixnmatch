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
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export default function Redeemhistory() {
  const [userisActive, setuserisActive] = useState([]);
  const auth = useAuthUser();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setuserisActive([]);
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
      `http://localhost:8000/booking/redeem/${auth.branchId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let myList = new Array(result.length).fill(false);
        setUsers(result);
        myList = result.map((item) => item.status);
        setuserisActive(myList);
      })
      .catch((error) => console.log("error", error));
  };
  const handleChangeisActive = async (event, index, userId) => {
    const newUserIsActive = [...userisActive]; // Create a copy of the state
    newUserIsActive[index] = event.target.checked; // Update the specific element based on index
    setuserisActive(newUserIsActive);
    UsersUpdate(newUserIsActive[index], userId);
    alert("เปลี่ยนแปลงการอนุมัติสำเร็จ");
  };
  const UsersUpdate = (isActiveTF, userId) => {
    var isActivenum = 0;
    isActiveTF === true ? (isActivenum = 1) : (isActivenum = 0);
    console.log("userid UsersUpdate", userId);
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      console.error("Missing JWT token in cookie");
      return; // Handle missing token scenario (e.g., redirect to login)
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    var raw = JSON.stringify({
      status: isActivenum,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/booking/redeem/" + userId, requestOptions)
      .then((response) => response.text())
      // .then((result) => (window.location.href = "/admin/user"))
      .catch((error) => console.log("error", error));
  };

  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      {/* <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div> */}
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ตาราง : ประวัติการแลกแต้ม
              {/* http://localhost:8000/booking/redeem
              LIST IN DASHBOARD */}
            </Typography>
          </Box>
          <Box>
            <Link to="/admin/form">
              <Button variant="contained" color="primary">
                สร้างโปรโมชั่นแลกแต้ม
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                {/* <TableCell align="center">รูป</TableCell> */}
                <TableCell align="center">ขื่อผู้ใช้</TableCell>
                <TableCell align="center">แต้มที่ใช้แลก</TableCell>
                <TableCell align="center">ชื่อโปรโมชั่นที่แลก</TableCell>
                <TableCell align="center">อนุมัติ</TableCell>
                {/* <TableCell align="center">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.ID}>
                  <TableCell align="center">{user.redeemhisId}</TableCell>
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
                  <TableCell align="center">{user.redeemtype_point}</TableCell>
                  <TableCell align="center">{user.redeemtype_name}</TableCell>
                  {/* <TableCell align="center">{user.status}</TableCell> */}
                  <TableCell align="center">
                    <label class="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="checked"
                        class="sr-only peer"
                        checked={userisActive[index]} // Set checked based on state
                        onChange={(event) =>
                          handleChangeisActive(event, index, user.redeemhisId)
                        }
                      />

                      <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                    </label>
                  </TableCell>
                  {/* <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                      <Button onClick={() => UserDelete(user.id)}>Del</Button>
                    </ButtonGroup>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
