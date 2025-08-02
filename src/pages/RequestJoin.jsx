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
export default function Requestjoin() {
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterUsers] = useState([]);
  const [userisActive, setuserisActive] = useState([]);
  useEffect(() => {
    setuserisActive([]);
    UsersGet();
  }, []);

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

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8000/users/requestjoin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let myList = new Array(result.length).fill(false);
        setUsers(result);
        myList = result.map((item) => item.isActive);
        setuserisActive(myList);
        setFilterUsers(result);
      })
      .catch((error) => console.log("error", error));
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
      isActive: isActivenum,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/users/" + userId, requestOptions)
      .then((response) => response.text())
      // .then((result) => (window.location.href = "/admin/user"))
      .catch((error) => console.log("error", error));
  };
  const handleChangeisActive = async (event, index, userId) => {
    const newUserIsActive = [...userisActive]; // Create a copy of the state
    newUserIsActive[index] = event.target.checked; // Update the specific element based on index
    setuserisActive(newUserIsActive);
    UsersUpdate(newUserIsActive[index], userId);
    alert("เปลี่ยนแปลงการอนุมัติสำเร็จ"); // Update the state with the modified array
  };
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue == "") {
      setFilterUsers(users);
    } else {
      const filterusers = users.filter((user) =>
        `${user.name_branch}`.toLowerCase().includes(searchValue)
      );
      setFilterUsers(filterusers);
    }
  };
  return (
    <Container sx={{ p: 2 }} maxWidth="lg">
      <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
          onChange={handleSearch}
        />
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
              ตารางรายการ : ร้านทั้งหมด / ร้านที่ขอเข้าร่วม
              {/* SELECT 
  bi.name_branch,
  u.username,
  bi.address,
  u.phone,
  u.email,
  u.isActive
FROM branchinfo bi
INNER JOIN users u ON JSON_CONTAINS(u.branchId, CAST(bi.id_branch AS JSON)) */}
            </Typography>
          </Box>
          {/* <Box>
            <Link to="/create">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box> */}
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">ID</TableCell> */}
                <TableCell align="center">ชื่อร้าน</TableCell>
                <TableCell align="center">User (ShopAdmin)</TableCell>
                <TableCell align="left">ที่อยู่</TableCell>
                <TableCell align="center">เบอร์ติดต่อ</TableCell>
                <TableCell align="center">อีเมลล์</TableCell>
                <TableCell align="center">อนุมัติ</TableCell>
                {/* <TableCell align="center">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterusers.map((user, index) => (
                <TableRow key={user.name_branch}>
                  {/* <TableCell align="right">{user.id}</TableCell> */}
                  <TableCell align="center">{user.name_branch} </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell
                    align="left"
                    style={{
                      maxWidth: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.address}
                  </TableCell>
                  <TableCell align="center">
                    {user.phone == null ? "-" : `${user.phone}`}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    <label class="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value="checked"
                        class="sr-only peer"
                        checked={userisActive[index]} // Set checked based on state
                        onChange={(event) =>
                          handleChangeisActive(event, index, user.userId)
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
