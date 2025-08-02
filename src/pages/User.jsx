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
export default function User() {
  const auth = useAuthUser();
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterUsers] = useState([]);
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

    fetch(`http://localhost:8000/users/branch/${auth.branchId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setFilterUsers(result);
      })
      .catch((error) => console.log("error", error));
  };

  const UpdateUser = (id) => {
    window.location = "/update/" + id;
  };

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
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue == "") {
      setFilterUsers(users);
    } else {
      const filterusers = users.filter((user) =>
        `${user.username}`.toLowerCase().includes(searchValue)
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
              ตาราง : รายชื่อลูกค้า
              {/* http://localhost:8000/usersForEachBranch w/Point */}
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
                <TableCell align="center">userId</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">ชื่อ-นามสกุล</TableCell>
                {/* <TableCell align="center">Username</TableCell> */}

                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Tel</TableCell>
                <TableCell align="center">Point</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterusers.map((user) => (
                <TableRow key={user.ID}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={user.avatar} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">
                    {user.fname} {user.lname}
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.phone == null ? "-" : user.phone}
                  </TableCell>
                  <TableCell align="center">{user.point}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                      {/* <Button onClick={() => UserDelete(user.id)}>Del</Button> */}
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
