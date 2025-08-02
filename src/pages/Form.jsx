import { React, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Form() {
  const auth = useAuthUser();
  const [datapromo, setDatapromo] = useState([]);

  const [selectedDatebooking1, setSelectedDatebooking1] = useState(dayjs());
  const [selectedDatebooking2, setSelectedDatebooking2] = useState(dayjs());
  const [selectedDatepromotion, setSelectedDatepromotion] = useState(dayjs());

  const handleDateChangebooking1 = (newValue) => {
    setSelectedDatebooking1(newValue);
  };
  const handleDateChangebooking2 = (newValue) => {
    setSelectedDatebooking2(newValue);
  };
  const handleDatepromotion = (newValue) => {
    setSelectedDatepromotion(newValue);
  };
  const handleDatailChange = (newValue) => {
    setIsdetail(!isCheckeddetail);
  };
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isCheckeddetail, setIsdetail] = useState(false);
  const handletickChange1 = () => {
    if (isChecked1 === true) {
      setIsChecked1(false);
      setIsChecked2(true);
    } else if (isChecked1 === false) {
      setIsChecked1(true);
      setIsChecked2(false);
    }
  };
  const handletickChange2 = () => {
    if (isChecked2 === true) {
      setIsChecked2(false);
      setIsChecked1(true);
    } else if (isChecked2 === false) {
      setIsChecked2(true);
      setIsChecked1(false);
    }
  };
  //เปิดการจองโต๊ะ
  //makebodyfor createbooking
  const [tablenumber, setTablenumber] = useState(null);
  const [seat, setSeat] = useState(null);
  const [databook1, setDatabook1] = useState([]);
  const [databookforall, setDatabookforall] = useState([]);
  const [datatableinfo, setDatatableinfo] = useState([]);
  const [datacreatepromotion, setDatacreatepromotion] = useState([]);
  //สร้างโปรโมชั่น
  const [promotionName, setpromotionName] = useState(null);
  const [promotionDetail, setpromotionDetail] = useState(null);
  const [promotionPoint, setpromotionPoint] = useState(null);
  const [promotionGift, setpromotionGift] = useState("โค้ก");
  const [datapromotionforpost, setdatapromotionforpost] = useState([]);
  useEffect(() => {
    setDatabook1([
      {
        tablenumbername: tablenumber,
        idBranch: auth.branchId,
        seat: seat,
        maxseat: seat,
        dateReserve: convertDateToString(selectedDatebooking1),
        timeSection: "-",
        isAdmin: 1,
        lastuserId: auth.userid,
      },
    ]);
    console.log("setdatabook", setDatabook1);
  }, [tablenumber, seat, selectedDatebooking1]);
  useEffect(() => {
    setdatapromotionforpost({
      redeemtype_name: promotionName,
      redeemtype_desc: promotionDetail,
      redeemgift: promotionGift,
      redeemtype_point: promotionPoint,
      redeemtype_limit: 100,
      isExpired: convertDateToString(selectedDatepromotion),
      branchId: auth.branchId,
    });
    // console.log("setdatabook", setDatabook1);
  }, [
    promotionName,
    promotionDetail,
    promotionPoint,
    promotionGift,
    selectedDatepromotion,
  ]);
  useEffect(() => {
    getBook();
  }, [selectedDatebooking2]);

  function convertDateToString(dateString) {
    const date = new Date(dateString); // Parse the date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    const formattedDate = `${year}-${month}-${day}`; // Format the date string
    return formattedDate;
  }
  // var datashop = [];
  function getBook() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    fetch(
      `http://localhost:8000/booking?tablenumbername=0&idBranch=${
        auth.branchId
      }&dateReserve=${convertDateToString(selectedDatebooking2)}`,
      {
        method: "GET",
        headers: myHeaders,
        // body: JSON.stringify(datauser),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("get booking", result);
        console.log("get booking", result["result"][0]);
        setDatapromo(result["result"]);
        console.log("dataptomo", datapromo);
        // console.log(data);
      });
  }
  function gettableinfo() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    fetch(`http://localhost:8000/booking/tableinfo?idBranch=${auth.branchId}`, {
      method: "GET",
      headers: myHeaders,
      // body: JSON.stringify(datauser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("get tableinfo", result);
        console.log("get tableinfo", result["result"]);
        setDatatableinfo(result["result"]);
      });
  }
  function getpromoinfo() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    fetch(`http://localhost:8000/redeempromo?idBranch=${auth.branchId}`, {
      method: "GET",
      headers: myHeaders,
      // body: JSON.stringify(datauser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("get promo", result);
        console.log("get promo", result["result"]);
        setDatacreatepromotion(result["result"]);
      });
  }

  const onSubmit1 = (event) => {
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
    console.log("submit1");
    var bodydata = [];
    if (isChecked1 === true) {
      bodydata = databookforall;
    } else if (isChecked2 === true) {
      bodydata = databook1;
    }
    console.log("bodydata", bodydata);
    // if (tablenumber != null && seat != null) {
    try {
      fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(bodydata),
      })
        .then((res) => res.json())
        .then((result) => {
          alert("เปิดการจองโต๊ะสำเร็จ");
          console.log(bodydata);
          //get booking
          console.log("เปิดการจองโต๊ะสำเร็จ", result);

          setSelectedDatebooking2(selectedDatebooking1);
          getBook();

          // Access response data
        });
    } catch (error) {
      console.error(" error :", error);
    }
    // } else {
    //   alert("กรุณากรอก ข้อมูลให้ครบถ้วน");
    // }
  };
  const onSubmit2 = (event) => {
    event.preventDefault();
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      return;
    }

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var bodydata = datapromotionforpost;
    try {
      fetch("http://localhost:8000/redeempromo", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(bodydata),
      })
        .then((res) => res.json())
        .then((result) => {
          alert("สร้างโปรโมชั่นแลกแต้มสำเร็จ");
          console.log(bodydata);
          //get booking
          console.log("สร้างโปรโมชั่นแลกแต้มสำเร็จ", result);
          setpromotionName("");
          setpromotionDetail("");
          setpromotionPoint("");
          getpromoinfo();
        });
    } catch (error) {
      console.error(" error :", error);
    }
  };
  useEffect(() => {
    gettableinfo();
    getpromoinfo();
  }, []);
  useEffect(() => {
    var list = [];
    for (var i = 0; i < datatableinfo.length; i++) {
      list.push({
        tablenumbername: datatableinfo[i].tablenumber,
        idBranch: auth.branchId,
        seat: datatableinfo[i].maxseat,
        maxseat: datatableinfo[i].maxseat,
        dateReserve: convertDateToString(selectedDatebooking1),
        timeSection: "-",
        isAdmin: 1,
        lastuserId: auth.userid,
      });
    }
    console.log("databookforall", list);
    setDatabookforall(list);
  }, [datatableinfo, selectedDatebooking2, isChecked1, isChecked2]);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-start">
          <div className="hidden w-full xl:block xl:w-1/2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2 p-5"
              for="grid-first-name"
            >
              เปิดการจองโต๊ะ
            </label>
            <form
              onSubmit={onSubmit1}
              class="max-w-md mx-auto grid grid-cols-1 gap-4 justify-items: start align-items: center"
            >
              <div className="pb-5">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  วันที่สำหรับการจอง
                </label>
                <Box style={{ padding: "0px" }}>
                  {/* <Tygography variant="h5">Date picker mui</Tygography> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label={"Select Date"}
                      onChange={handleDateChangebooking1}
                      value={selectedDatebooking1}
                    ></DatePicker>
                  </LocalizationProvider>
                </Box>
              </div>

              <div class="flex items-center mb-1">
                <input
                  checked={isChecked1}
                  id="default-radio-1"
                  type="checkbox"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 dark:bg-gray-700"
                  onChange={handletickChange1}
                />
                <label
                  for="default-radio-1"
                  class="ms-2 text-sm font-medium text-black-900 dark:text-black-300"
                >
                  เลือกโต๊ะทั้งหมด
                  {isCheckeddetail ? (
                    <a
                      href="#"
                      class="ml-2 text-blue-500 hover:text-blue-600"
                      onClick={handleDatailChange}
                    >
                      ปิดรายละเอียด
                    </a>
                  ) : (
                    <a
                      href="#"
                      class="ml-2 text-blue-500 hover:text-blue-600"
                      onClick={handleDatailChange}
                    >
                      ดูรายละเอียด
                    </a>
                  )}
                </label>
              </div>
              {isCheckeddetail ? (
                <div className="mt-1 flex flex-col gap-3">
                  {datatableinfo.map((product) => (
                    <Link
                      key={product.tablenumber}
                      // to={`/product/${product.id}`}
                      className="flex items-start hover:no-underline"
                    >
                      {/* <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm"></div> */}
                      <div className="ml-4 flex-1">
                        <p className="text-sm text-gray-800">
                          เปิดการจองโตีะที่ {product.tablenumber} จำนวนที่นั่ง{" "}
                          {product.maxseat} ที่
                        </p>
                      </div>
                      {/* <div className="text-xs text-gray-400 pl-1.5">
                        เช็คอินล่าสุด {product.product_price}
                      </div> */}
                    </Link>
                  ))}
                </div>
              ) : (
                <></>
              )}

              <div class="flex items-center py-5">
                <input
                  checked={isChecked2}
                  id="default-radio-2"
                  type="checkbox"
                  value=""
                  name="default-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 dark:bg-gray-700"
                  onChange={handletickChange2}
                />
                <label
                  for="default-radio-2"
                  class="ms-2 text-sm font-medium text-black-900 dark:text-black-300"
                >
                  เลือกบางโต๊ะ
                </label>
              </div>
              {isChecked2 === true ? (
                <>
                  <div class="relative z-0 w-full mb-5 group ">
                    <input
                      value={tablenumber}
                      onChange={(event) => setTablenumber(event.target.value)}
                      type="number"
                      name="tablenumber"
                      id="tablenumber"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_password"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      หมายเลขโต๊ะที่{" "}
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      value={seat}
                      onChange={(event) => setSeat(event.target.value)}
                      type="number"
                      name="seat"
                      id="seat"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_password"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      จำนวนที่นั่ง{" "}
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}

              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Submit
              </button>
            </form>
            <label
              class="block uppercase tracking-wide text-blue-700 text-xl font-bold mb-0 pt-7 px-5"
              for="grid-first-name"
            >
              รายการจองโต๊ะที่เปิดใช้งาน
            </label>
            <div className="p-5">
              {/* <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                วันที่หมดอายุ
              </label> */}
              <Box style={{ padding: "0px" }}>
                {/* <Tygography variant="h5">Date picker mui</Tygography> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"เลือกวันที่"}
                    onChange={handleDateChangebooking2}
                    value={selectedDatebooking2}
                  ></DatePicker>
                </LocalizationProvider>
              </Box>
            </div>
            {datapromo.length > 0 ? (
              <Card className="w-full-10 mx-10 bg-blue-100">
                <List>
                  {datapromo.map((item) => (
                    <ListItem>
                      {/* <ListItemPrefix>
            <Avatar
              variant="circular"
              alt={item.title}
              src={`https://docs.material-tailwind.com/img/face-${Math.floor(Math.random() * 3) + 1}.jpg`}
            />
          </ListItemPrefix> */}
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          โต๊ะที่ {item.tablenumbername}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          จำนวนที่นั่ง {item.avaliableseat} ที่
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
            ) : (
              <label
                class="block uppercase tracking-wide text-blue-700 text-2xs font-bold mb-0 pt-0 px-5"
                for="grid-first-name"
              >
                - ยังไม่ได้เปิดการจองโต๊ะ ตามวันที่เลือก
              </label>
            )}

            <div className="py-5"></div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2 pb-5"
                for="grid-first-name"
              >
                สร้างโปรโมชั่นแลกแต้ม
                {/* redeemtype table */}
              </label>
              <form onSubmit={onSubmit2} class="max-w-md mx-auto">
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    value={promotionName}
                    onChange={(event) => setpromotionName(event.target.value)}
                    type="text"
                    name="promname"
                    id="promname"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="promname"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    ชื่อโปรโมชั่น
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    value={promotionDetail}
                    onChange={(event) => setpromotionDetail(event.target.value)}
                    type="text"
                    name="floating_password"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    รายละเอียด
                  </label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    value={promotionPoint}
                    onChange={(event) => setpromotionPoint(event.target.value)}
                    type="number"
                    name="point"
                    id="point"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    แต้มที่ใช้แลก{" "}
                  </label>
                </div>

                {/* <div class="inline-block relative ">
                  <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>เลือกของแถม</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
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
                </div> */}
                <div class="w-full ">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    เลือกของที่ใช้แลก
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      value={promotionGift}
                      onChange={(event) => setpromotionGift(event.target.value)}
                    >
                      <option>โค้ก</option>
                      <option>เป๊ปซี่</option>
                      <option>แฟนต้า</option>
                      <option>น้ำแข็ง</option>
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
                <div className="py-5">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    วันที่เริ่มโปรโมชั่น
                  </label>
                  <Box style={{ padding: "0px" }}>
                    {/* <Tygography variant="h5">Date picker mui</Tygography> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"Select Date"}
                        // onChange={handleDatepromotion}
                        // value={selectedDatepromotion}
                      ></DatePicker>
                    </LocalizationProvider>
                  </Box>
                </div>

                <div className="py-5">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    วันที่หมดอายุ
                  </label>
                  <Box style={{ padding: "0px" }}>
                    {/* <Tygography variant="h5">Date picker mui</Tygography> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={"Select Date"}
                        onChange={handleDatepromotion}
                        value={selectedDatepromotion}
                      ></DatePicker>
                    </LocalizationProvider>
                  </Box>
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>

              <label
                class="block uppercase tracking-wide text-blue-700 text-xl font-bold mb-2 pt-7 px-5"
                for="grid-first-name"
              >
                ประวัติรายการโปรโมชั่นที่เปิดใช้งาน
              </label>

              <Card className="w-full-10 mx-10 bg-blue-100">
                <List>
                  {datacreatepromotion.map((promotion) => (
                    <ListItem key={promotion.redeemtype_name}>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          โปรโมชั่น {promotion.redeemtype_name} หมดอายุ{" "}
                          {convertDateToString(promotion.isExpired)}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          ใช้ {promotion.redeemtype_point} แต้ม แลก{" "}
                          {promotion.redeemgift} ฟรี 1 รายการ
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
              <div className="py-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
