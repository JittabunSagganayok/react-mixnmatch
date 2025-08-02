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
export default function ManageShop() {
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterUsers] = useState([]);

  useEffect(() => {
    UsersGet();
  }, []);
  const UsersGet = async () => {
    // Get the JWT token from the cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      console.error("Missing JWT token in cookie");
      // return; // Handle missing token scenario (e.g., redirect to login)
    }
    // console.log("cookieValue", cookieValue);
    // console.log("token", token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      // headers: myHeaders,
      redirect: "follow",
    };

    await fetch("http://localhost:8000/blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilterUsers(result);
      })
      .then(() => console.log("users", users))
      .catch((error) => console.log("error", error));
  };

  const UpdateUser = (id) => {
    window.location = "/updateblog/" + id;
  };

  const UserDelete = (id) => {
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
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8000/blog/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setUsers(result);
        UsersGet();
      })
      .catch((error) => console.log("error", error));
  };
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue == "") {
      setFilterUsers(users);
    } else {
      const filterusers = users.filter((user) =>
        `${user.blogtitle}`.toLowerCase().includes(searchValue)
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
              จัดการ Blogs
            </Typography>
          </Box>
          <Box>
            <Link to="/createblog">
              <Button variant="contained" color="primary">
                CREATE
              </Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">BannerPic</TableCell>
                <TableCell align="left">Blog Name</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Status</TableCell>
                {/* <TableCell align="left">Point</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterusers.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      {/* <Avatar src={user.avatar} /> */}
                      <img src={user.bannerimage} class="h-48 w-64" alt="..." />
                    </Box>
                  </TableCell>
                  <TableCell align="left">{user.blogtitle}</TableCell>
                  <TableCell
                    align="left"
                    style={{
                      maxWidth: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.blogdesc}
                  </TableCell>

                  <TableCell align="left">
                    {user.status == 1 ? "Active" : "Disable"}
                    {/* Active/Disable */}
                  </TableCell>
                  {/* <TableCell align="left">500</TableCell> */}
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                      <Button onClick={() => UserDelete(user.id)}>Del</Button>
                    </ButtonGroup>
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
