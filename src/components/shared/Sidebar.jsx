import React from "react";
import classNames from "classnames";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS_FORSHOPADMIN,
  DASHBOARD_SIDEBAR_LINKS_FORWEBADMIN,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";
import useSignOut from "react-auth-kit/hooks/useSignOut";
const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/");
  };
  const auth = useAuthUser();
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={24} />
        <span className="text-neutral-200 text-lg">
          MiXnMatch Admin {auth.role}
        </span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        {/* Conditional rendering based on auth.role */}
        {auth.role === "shopadmin" ? (
          DASHBOARD_SIDEBAR_LINKS_FORSHOPADMIN.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))
        ) : auth.role === "webadmin" ? (
          DASHBOARD_SIDEBAR_LINKS_FORWEBADMIN.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))
        ) : (
          <></>
          // Render nothing if no matching role
        )}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <button onClick={logout}>
          <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
