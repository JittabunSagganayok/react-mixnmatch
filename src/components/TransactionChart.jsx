import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TransactionChart() {
  const auth = useAuthUser();
  var [dataCountGet, setdataCountGet] = useState([
    {
      name: "Jan",
      CheckIn: 4000,
      User: 2400,
    },
    {
      name: "Feb",
      CheckIn: 3000,
      User: 1398,
    },
    {
      name: "Mar",
      CheckIn: 2000,
      User: 9800,
    },
    {
      name: "Apr",
      CheckIn: 2780,
      User: 3908,
    },
    {
      name: "May",
      CheckIn: 1890,
      User: 4800,
    },
    {
      name: "Jun",
      CheckIn: 2390,
      User: 3800,
    },
    {
      name: "July",
      CheckIn: 3490,
      User: 4300,
    },
    {
      name: "Aug",
      CheckIn: 2000,
      User: 9800,
    },
    {
      name: "Sep",
      CheckIn: 2780,
      User: 3908,
    },
    {
      name: "Oct",
      CheckIn: 1890,
      User: 4800,
    },
    {
      name: "Nov",
      CheckIn: 2390,
      User: 3800,
    },
    {
      name: "Dec",
      CheckIn: 3490,
      User: 4300,
    },
  ]);
  // var [filter, setFilter] = useState("วันนี้");
  // var [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   DataCountGet();
  //   console.log("dropdownchange");
  // }, [filter]);
  useEffect(() => {
    // setIsLoading(true);
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
      `http://localhost:8000/dashboard/graphdata?idBranch=${auth.branchId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setdataCountGet(result.result);

        // setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">
        แสดงจำนวนการเช็คอินและจำนวนผู้ใช้งานที่สมัครในแต่ละเดือน (ครั้ง)
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataCountGet}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CheckIn" fill="#1B7D4F" />
            <Bar dataKey="User" fill="#18392b" />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
