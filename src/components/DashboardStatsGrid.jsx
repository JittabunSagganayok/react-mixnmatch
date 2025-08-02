import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export default function DashboardStatsGrid() {
  const auth = useAuthUser();
  var [dataCountGet, setdataCountGet] = useState({
    bookingcount: [
      {
        period: "Today",
        reserve_count: 0,
      },
      {
        period: "This Month",
        reserve_count: 0,
      },
      {
        period: "This Year",
        reserve_count: 0,
      },
    ],
    checkincount: [
      {
        period: "Today",
        checkin_count: 0,
      },
      {
        period: "This Month",
        checkin_count: 0,
      },
      {
        period: "This Year",
        checkin_count: 0,
      },
    ],
    redeemcount: [
      {
        period: "Today",
        redeem_count: 0,
      },
      {
        period: "This Month",
        redeem_count: 0,
      },
      {
        period: "This Year",
        redeem_count: 0,
      },
    ],
  });
  var [filter, setFilter] = useState("วันนี้");
  var [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // DataCountGet();
    console.log("dropdownchange");
  }, [filter]);
  useEffect(() => {
    setIsLoading(true);
    DataCountGet();
  }, []);
  function DataCountGet() {
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

    fetch(
      `http://localhost:8000/dashboard/maincount?idBranch=${auth.branchId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdataCountGet(result.result);

        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div>
      {isLoading == false && dataCountGet.bookingcount != null ? (
        <>
          <div className="flex gap-4">
            <div class="w-full/2 ">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Sorting Data
              </label>
              <div class="relative">
                <select
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option>วันนี้ </option>
                  <option>เดือนนี้</option>
                  <option>ปีนี้</option>
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
            <BoxWrapper>
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                <IoPieChart className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">
                  จำนวนการจองโต๊ะ ({filter})
                  {/* {dataCountGet.bookingcount.length} */}
                  {/* !!! อย่าลืมเปลี่ยน branchId เป็น ตัวแปร */}
                  {/* SELECT 
  'Today' AS period,
  COALESCE(today_reserve_count, 0) AS reserve_count
FROM (
  SELECT 
      COUNT(*) AS today_reserve_count
  FROM 
      reservehistory
  WHERE 
      DATE(datereserve) = CURDATE()
      AND id_branch = 1
      AND isAdmin = 0
) AS today_reservations

UNION

SELECT 
  'This Month' AS period,
  COALESCE(this_month_reserve_count, 0) AS reserve_count
FROM (
  SELECT 
      COUNT(*) AS this_month_reserve_count
  FROM 
      reservehistory
  WHERE 
      YEAR(datereserve) = YEAR(CURDATE())
      AND MONTH(datereserve) = MONTH(CURDATE())
      AND id_branch = 1
      AND isAdmin = 0
) AS this_month_reservations

UNION

SELECT 
  'This Year' AS period,
  COALESCE(this_year_reserve_count, 0) AS reserve_count
FROM (
  SELECT 
      COUNT(*) AS this_year_reserve_count
  FROM 
      reservehistory
  WHERE 
      YEAR(datereserve) = YEAR(CURDATE())
      AND id_branch = 1
      AND isAdmin = 0
) AS this_year_reservations; */}
                </span>
                <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                    {filter == "วันนี้"
                      ? dataCountGet.bookingcount[0].reserve_count
                      : filter == "สัปดาห์นี้"
                      ? dataCountGet.bookingcount[1].reserve_count
                      : dataCountGet.bookingcount[2].reserve_count}
                  </strong>
                  <span className="text-sm text-green-500 pl-2"> ครั้ง</span>
                </div>
              </div>
            </BoxWrapper>
            <BoxWrapper>
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                <IoPeople className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">
                  จำนวนการ Check in ({filter})
                  {/* จำนวนการ Check in วันนี้ , ต่อเดือน , ต่อปี  */}
                  {/* !!! อย่าลืมเปลี่ยน branchId เป็น ตัวแปร */}
                  {/* SELECT 
  'Today' AS period,
  COALESCE(today_checkin_count, 0) AS checkin_count
FROM (
  SELECT 
      COUNT(*) AS today_checkin_count
  FROM 
      checkinhistory
  WHERE 
      DATE(date) = CURDATE()
      AND branchId = 1
) AS today_checkins

UNION

SELECT 
  'This Month' AS period,
  COALESCE(this_month_checkin_count, 0) AS checkin_count
FROM (
  SELECT 
      COUNT(*) AS this_month_checkin_count
  FROM 
      checkinhistory
  WHERE 
      YEAR(date) = YEAR(CURDATE())
      AND MONTH(date) = MONTH(CURDATE())
      AND branchId = 1
) AS this_month_checkins

UNION

SELECT 
  'This Year' AS period,
  COALESCE(this_year_checkin_count, 0) AS checkin_count
FROM (
  SELECT 
      COUNT(*) AS this_year_checkin_count
  FROM 
      checkinhistory
  WHERE 
      YEAR(date) = YEAR(CURDATE())
      AND branchId = 1
) AS this_year_checkins; */}
                </span>
                <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                    {filter == "วันนี้"
                      ? dataCountGet.checkincount[0].checkin_count
                      : filter == "สัปดาห์นี้"
                      ? dataCountGet.checkincount[1].checkin_count
                      : dataCountGet.checkincount[2].checkin_count}
                  </strong>
                  <span className="text-sm text-green-500 pl-2">ครั้ง</span>
                </div>
              </div>
            </BoxWrapper>
            <BoxWrapper>
              <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                <IoBagHandle className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">
                  จำนวนการขอแลกโปรโมชั่น ({filter})
                  {/* !!! อย่าลืมเปลี่ยน branchId เป็น ตัวแปร */}
                  {/* SELECT 
  'Today' AS period,
  COALESCE(today_redeem_count, 0) AS redeem_count
FROM (
  SELECT 
      COUNT(*) AS today_redeem_count
  FROM 
      redeempointhistory
  WHERE 
      DATE(date) = CURDATE()
      AND branchId = 1
) AS today_redeems

UNION

SELECT 
  'This Month' AS period,
  COALESCE(this_month_redeem_count, 0) AS redeem_count
FROM (
  SELECT 
      COUNT(*) AS this_month_redeem_count
  FROM 
      redeempointhistory
  WHERE 
      YEAR(date) = YEAR(CURDATE())
      AND MONTH(date) = MONTH(CURDATE())
      AND branchId = 1
) AS this_month_redeems

UNION

SELECT 
  'This Year' AS period,
  COALESCE(this_year_redeem_count, 0) AS redeem_count
FROM (
  SELECT 
      COUNT(*) AS this_year_redeem_count
  FROM 
      redeempointhistory
  WHERE 
      YEAR(date) = YEAR(CURDATE())
      AND branchId = 1
) AS this_year_redeems; */}
                </span>
                <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                    {filter == "วันนี้"
                      ? dataCountGet.redeemcount[0].redeem_count
                      : filter == "สัปดาห์นี้"
                      ? dataCountGet.redeemcount[1].redeem_count
                      : dataCountGet.redeemcount[2].redeem_count}
                  </strong>
                  <span className="text-sm text-green-500 pl-2">ครั้ง</span>
                </div>
              </div>
            </BoxWrapper>
            {/* <BoxWrapper>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
        <IoCart className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="text-sm text-gray-500 font-light">
          Total booking
        </span>
        <div className="flex items-center">
          <strong className="text-xl text-gray-700 font-semibold">
            16432
          </strong>
          <span className="text-sm text-red-500 pl-2">-43</span>
        </div>
      </div>
    </BoxWrapper> */}
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
