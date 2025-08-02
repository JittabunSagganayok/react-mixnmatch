// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
// const auth = useAuthUser();

// console.log("Roleshow", auth.role);
export const DASHBOARD_SIDEBAR_LINKS_FORSHOPADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "admin/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  // {
  //   key: "products",
  //   label: "Products",
  //   path: "/admin/products",
  //   icon: <HiOutlineCube />,
  // },
  // {
  //   key: "orders",
  //   label: "Orders",
  //   path: "/admin/orders",
  //   icon: <HiOutlineShoppingCart />,
  // },
  {
    key: "เปิดการจองโต๊ะ & สร้างโปรโมชั่นแลกแต้ม",
    label: "เปิดการจองโต๊ะ & สร้างโปรโมชั่นแลกแต้ม",
    path: "/admin/form",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "รายชื่อลูกค้า",
    label: "รายชื่อลูกค้า",
    path: "/admin/user",
    icon: <HiOutlineUsers />,
  },
  {
    key: "รายการการจอง",
    label: "รายการการจอง",
    path: "/admin/bookhistory",
    icon: <HiOutlineAnnotation />,
  },
  {
    key: "ประวัติการแลกแต้ม",
    label: "ประวัติการแลกแต้ม",
    path: "/admin/redeemhistory",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "รายการแสดงบนหน้าจอ",
    label: "รายการแสดงบนหน้าจอ",
    path: "/admin/showinscreen",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "QR Code เช็คอินร้านค้า",
    label: "QR Code เช็คอินร้านค้า",
    path: "/admin/qrcode",
    icon: <HiOutlineDocumentText />,
  },
  // {
  //   key: "ร้านที่ขอเข้าร่วม",
  //   label: "ร้านที่ขอเข้าร่วม",
  //   path: "/admin/requestjoin",
  //   icon: <HiOutlineAnnotation />,
  // },
];
export const DASHBOARD_SIDEBAR_LINKS_FORWEBADMIN = [
  {
    key: "ร้านทั้งหมด / ร้านที่ขอเข้าร่วม",
    label: "ร้านทั้งหมด / ร้านที่ขอเข้าร่วม",
    path: "/admin/requestjoin",
    icon: <HiOutlineUsers />,
  },
  {
    key: "จัดการร้านแนะนำ",
    label: "จัดการร้านแนะนำ",
    path: "/admin/manageshops",
    icon: <HiOutlineAnnotation />,
  },
  {
    key: "จัดการ Blogs",
    label: "จัดการ Blogs",
    path: "/admin/manageblogs",
    icon: <HiOutlineDocumentText />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/admin/settings",
  //   icon: <HiOutlineCog />,
  // },
  // {
  //   key: "support",
  //   label: "Help & Support",
  //   path: "/admin/support",
  //   icon: <HiOutlineQuestionMarkCircle />,
  // },
];
