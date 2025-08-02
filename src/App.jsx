import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import AdminLayout from "./pages/AdminLayout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BlogsDetails from "./pages/BlogsDetails";
import Loader from "./common/loader";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import User from "./pages/User";
import Manageblog from "./pages/ManageBlog";
import Manageshop from "./pages/ManageShop";
import Bookhistory from "./pages/bookHistory";
import Redeemhistory from "./pages/RedeemHistory";
import Requestjoin from "./pages/RequestJoin";
import UserCreate from "./pages/UserCreate";
import ShopCreate from "./pages/ShopCreate";
import BlogCreate from "./pages/BlogCreate";
import UserUpdate from "./pages/UserUpdate";
import ShopUpdate from "./pages/ShopUpdate";
import BlogUpdate from "./pages/BlogUpdate";
import ShowinScreen from "./pages/ShowinScreen";
import Playlistdisplay from "./pages/Playlistdisplay";
import Qrcode from "./pages/Qrcode";
// import BookingCreate from "./pages/BookingCreate";
import Layoutadmin from "./components/shared/Layout";
// import DashboardMain from "./pages/DashboardMain";
import AOS from "aos";
import "aos/dist/aos.css";

import useColorMode from "./pages/theme/useColorMode";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const App = () => {
  React.useEffect(() => {
    // htmlElement.classList.add("dark");
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  const [colorMode, setColorMode] = useColorMode();
  React.useEffect(() => {
    // Apply the 'dark' class to the html element for dark mode
    const htmlElement = document.documentElement;
    htmlElement.classList.add("dark");
  }, []);
  return (
    <>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthOutlet fallbackPath="auth/signin" />}>
              <Route path="/playlistdisplay" element={<Playlistdisplay />} />
              <Route path="/" element={<Layoutadmin />}>
                <Route path="admin/loader" element={<Loader />} />
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/form" element={<Form />} />
                <Route path="admin/user" element={<User />} />
                <Route path="admin/bookhistory" element={<Bookhistory />} />
                <Route path="admin/redeemhistory" element={<Redeemhistory />} />
                <Route path="admin/showinscreen" element={<ShowinScreen />} />
                <Route path="admin/qrcode" element={<Qrcode />} />

                <Route path="admin/requestjoin" element={<Requestjoin />} />
                <Route path="admin/manageshops" element={<Manageshop />} />
                <Route path="admin/manageblogs" element={<Manageblog />} />
                {/* <Route
                  path="admin/booking/create"
                  element={<BookingCreate />}
                /> */}
                <Route path="/create" element={<UserCreate />} />
                <Route path="/createshop" element={<ShopCreate />} />
                <Route path="/createblog" element={<BlogCreate />} />
                <Route path="/update/:id" element={<UserUpdate />} />
                <Route path="/updateshop/:id" element={<ShopUpdate />} />
                <Route path="/updateblog/:id" element={<BlogUpdate />} />
              </Route>
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/:id" element={<BlogsDetails />} />
              <Route path="best-places" element={<PlacesRoute />} />
              <Route path="about" element={<About />} />

              <Route path="auth/signin" element={<Login />} />
              <Route path="auth/signup" element={<SignUp />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
