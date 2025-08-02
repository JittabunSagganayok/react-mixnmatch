import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
export default function ShopUpdate() {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const uploadImage = async (e) => {
    // console.log("EEE", e);
    var formdata = new FormData();
    formdata.append("module", "customer/file");
    formdata.append("file", e, "upload.jpg");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://mcic-uat-api.gramick.dev/api/systems/upload", requestOptions)
      .then((response) => response.text())
      .then((result) =>
        // console.log("RES", JSON.parse(result).result.url),
        setImg(JSON.parse(result).result.url)
      )
      .catch((error) => console.log("error", error));
  };
  const handleFileChange = (event) => {
    // setSelectedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };
  useEffect(() => {
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

    fetch("http://localhost:8000/shoprecom/" + id, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setShopname(result[0].shoptitle);
        setShopdesc(result[0].shopdesc);
        setImg(result[0].bannerimage);
        setStatus(result[0].status);
      })
      .catch((error) => console.log("error", error));
  };

  //กด SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(img);
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

    var raw =
      img != ""
        ? JSON.stringify({
            bannerimage: img,
            shoptitle: shopname,
            shopdesc: shopdesc,
            status: status,
          })
        : JSON.stringify({
            shoptitle: shopname,
            shopdesc: shopdesc,
            status: status,
          });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/shoprecom/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => (window.location.href = "/admin/manageshops"))
      .catch((error) => console.log("error", error));
  };

  const [shopname, setShopname] = useState("");
  const [shopdesc, setShopdesc] = useState("");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState(1);
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState("");

  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <div>
        <Typography component="h1" variant="h5">
          ร้านแนะนำ
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt: 2 }} spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="shopname"
                variant="outlined"
                required
                fullWidth
                id="shopname"
                label="ชื่อร้านค้า"
                value={shopname}
                onChange={(e) => setShopname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                รายละเอียด
              </label>
              <textarea
                onChange={(e) =>
                  // console.log("onchange textareas", e.target.value)
                  setShopdesc(e.target.value)
                }
                value={shopdesc}
                id="message"
                rows="10"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="เขียนคำอธิบายร้านค้า"
              ></textarea>
            </Grid>

            <Grid item xs={12}>
              <div className="p-5">
                <Box display="flex" justifyContent="center">
                  {/* <Avatar src={user.avatar} /> */}
                  <img src={img} class="h-64 w-" alt="..." />
                </Box>
              </div>

              <label
                class="block mb-2 text-sm font-medium text-black"
                for="file_input"
              >
                Change Banner Picture
              </label>
              <input
                ref={fileInputRef}
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </Grid>
            <Grid item xs={12}>
              <div class="w-full ">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  สถานะ
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={status == 1 ? "Active" : "Disable"}
                    onChange={(e) => {
                      e.target.value == "Active" ? setStatus(1) : setStatus(0);
                    }}
                  >
                    <option>Active</option>
                    <option>Disable</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Grid>
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
