import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPieChart, IoPeople } from "react-icons/io5";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function DashboardStatsGrid() {
  const auth = useAuthUser();

  const [dataCountGet, setDataCountGet] = useState({
    bookingcount: [
      { period: "Today", reserve_count: 0 },
      { period: "This Month", reserve_count: 0 },
      { period: "This Year", reserve_count: 0 },
    ],
    checkincount: [
      { period: "Today", checkin_count: 0 },
      { period: "This Month", checkin_count: 0 },
      { period: "This Year", checkin_count: 0 },
    ],
    redeemcount: [
      { period: "Today", redeem_count: 0 },
      { period: "This Month", redeem_count: 0 },
      { period: "This Year", redeem_count: 0 },
    ],
  });

  const [filter, setFilter] = useState("วันนี้");
  const [isLoading, setIsLoading] = useState(false);

  // mapping ภาษาไทย -> key period API
  const periodMap = {
    วันนี้: "Today",
    เดือนนี้: "This Month",
    ปีนี้: "This Year",
  };

  const getCount = (dataArray, keyName) => {
    const targetPeriod = periodMap[filter];
    const found = dataArray.find(
      (item) =>
        item.period.trim().toLowerCase() === targetPeriod.trim().toLowerCase()
    );
    return found ? found[keyName] : 0;
  };

  useEffect(() => {
    console.log("dropdownchange", filter);
    console.log(dataCountGet.redeemcount);
  }, [filter]);

  useEffect(() => {
    setIsLoading(true);
    DataCountGet();
  }, []);

  function DataCountGet() {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      console.error("Missing JWT token in cookie");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(
      `https://api-mixnmatch-ig1a.vercel.app/dashboard/maincount?idBranch=${auth.branchId}`,
      { method: "GET", headers: myHeaders }
    )
      .then((response) => response.json())
      .then((result) => {
        setDataCountGet(result.result);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      {isLoading === false && dataCountGet.bookingcount ? (
        <div className="flex gap-4">
          {/* Dropdown */}
          <div className="w-full/2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Sorting Data
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(event) => setFilter(event.target.value)}
                value={filter}
              >
                <option>วันนี้</option>
                <option>เดือนนี้</option>
                <option>ปีนี้</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* จำนวนการจองโต๊ะ */}
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
              <IoPieChart className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                จำนวนการจองโต๊ะ ({filter})
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {getCount(dataCountGet.bookingcount, "reserve_count")}
                </strong>
                <span className="text-sm text-green-500 pl-2">ครั้ง</span>
              </div>
            </div>
          </BoxWrapper>

          {/* จำนวนการ Check in */}
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
              <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                จำนวนการ Check in ({filter})
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {getCount(dataCountGet.checkincount, "checkin_count")}
                </strong>
                <span className="text-sm text-green-500 pl-2">ครั้ง</span>
              </div>
            </div>
          </BoxWrapper>

          {/* จำนวนการขอแลกโปรโมชั่น */}
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
              <IoBagHandle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                จำนวนการขอแลกโปรโมชั่น ({filter})
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  {getCount(dataCountGet.redeemcount, "redeem_count")}
                </strong>
                <span className="text-sm text-green-500 pl-2">ครั้ง</span>
              </div>
            </div>
          </BoxWrapper>
        </div>
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
