import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function UserUpdate() {
  const { id } = useParams();
  useEffect(() => {
    // fetch("http://localhost:8000/users/" + id)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setFname(result.user.fname);
    //     setLname(result.user.lname);
    //     setUsername(result.user.username);
    //     setEmail(result.user.email);
    //     setAvatar(result.user.avatar);
    //   });
    UsersGet();
  }, [id]);
  const UsersGet = () => {
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

    fetch("http://localhost:8000/users/" + id, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result[0].fname);
        setFname(result[0].fname);
        setLname(result[0].lname);
        setUsername(result[0].username);
        setEmail(result[0].email);
        setPhone(result[0].phone);
        setAvatar(result[0].avatar);
      })
      .catch((error) => console.log("error", error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
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
      email: email,
      fname: fname,
      username: username,
      lname: lname,
      phone: phone,
      avatar: avatar,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/users/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => (window.location.href = "/admin/user"))
      .catch((error) => console.log("error", error));
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt: 2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                label="Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
