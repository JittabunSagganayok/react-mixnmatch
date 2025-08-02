import React, { useState } from "react";
import classNames from "classnames";
const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "../../assets/logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
export const NavbarLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Best Places",
    link: "/best-places",
  },
];

const DropdownLinks = [
  {
    name: "Our Services",
    link: "/#services",
  },
  {
    name: "Top Brands",
    link: "/#mobile_brands",
  },
  {
    name: "Location",
    link: "/#location",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/");
  };
  const [showMenu, setShowMenu] = useState(false);
  var auth = useAuthUser();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  if (auth == null) {
    console.log("auth null");
    auth = "";
  }
  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        {/* <div className="bg-gradient-to-r from-primary to-secondary text-white ">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm">20% off on next booking</p>
              <p>mobile no. +91 123456789</p>
            </div>
          </div>
        </div> */}
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4  font-bold text-2xl">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-5" />
              </Link>
              {/* <span>TCJ Tourism</span> */}
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 ">
                <li className="py-4">
                  <NavLink to="/" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      หน้าหลัก
                    </p>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/blogs" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      บทความที่น่าสนใจ
                    </p>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/best-places" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      ร้านแนะนำ
                    </p>
                  </NavLink>
                </li>
                <li className="py-4">
                  <NavLink to="/about" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      เกี่ยวกับเรา
                    </p>
                  </NavLink>
                </li>
                {/* <li className="group relative cursor-pointer">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Quick Links{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-md ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li> */}
              </ul>
            </div>
            <div
              className="flex items-center gap-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={() => {
                  // handleOrderPopup();
                  navigate("/auth/signup");
                }}
              >
                <p className="font-custom font-bold text-1xl">เข้าร่วมกับเรา</p>
              </button>
              {/* <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={() => {
                  <NavLink to="/blogs" activeClassName="active"></NavLink>;
                  // handleOrderPopup();
                }}
              > */}
              {/* Conditional rendering based on auth.role */}
              {auth == "" ? (
                <NavLink to="auth/signin" activeClassName="active">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="font-custom font-bold text-1xl"
                  >
                    เข้าสู่ระบบ
                  </p>
                </NavLink>
              ) : auth.role === "shopadmin" ? (
                <div className="flex items-center">
                  <NavLink to="admin/dashboard" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      จัดการร้านค้า
                    </p>
                  </NavLink>
                  <button onClick={logout}>
                    <div
                      className={classNames(
                        linkClass,
                        "cursor-pointer text-red-500"
                      )}
                    >
                      <span className="text-xl">
                        <HiOutlineLogout />
                      </span>
                      {/* Logout */}
                    </div>
                  </button>
                </div>
              ) : auth.role === "webadmin" ? (
                <div className="flex items-center">
                  <NavLink to="admin/requestjoin" activeClassName="active">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="font-custom font-bold text-1xl"
                    >
                      จัดการเว็ปไซต์
                    </p>
                  </NavLink>
                  <button onClick={logout}>
                    <div
                      className={classNames(
                        linkClass,
                        "cursor-pointer text-red-500"
                      )}
                    >
                      <span className="text-xl">
                        <HiOutlineLogout />
                      </span>
                      {/* Logout */}
                    </div>
                  </button>
                </div>
              ) : (
                <NavLink to="auth/signin" activeClassName="active">
                  <p
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className="font-custom font-bold text-1xl"
                  >
                    เข้าสู่ระบบ
                  </p>
                </NavLink>
              )}

              {/* </button> */}
              {/* Mobile Hamburger icon */}
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
