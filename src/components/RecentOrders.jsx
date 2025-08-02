import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function RecentOrders() {
  const auth = useAuthUser();

  var [dataCountGet, setdataCountGet] = useState([
    {
      userId: "userId",
      username: "username",
      date: "2022-05-17T03:24:00",
      time: "time",
    },
  ]);
  var [isLoading, setIsLoading] = useState(false);
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
      `http://localhost:8000/dashboard/recentcheckin?idBranch=${auth.branchId}`,
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
    <>
      {isLoading == false && dataCountGet != null ? (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
          <strong className="text-gray-700 font-medium">
            Recent Check-In
            {/* http://localhost:8000/dashboard/recentcheckin?idBranch=1 */}
          </strong>
          <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
              <thead>
                <tr>
                  <th>ID</th>
                  {/* <th>Product ID</th> */}
                  <th>Avatar</th>
                  <th>ชื่อ</th>
                  <th>วันที่</th>
                  <th>เวลา</th>
                  <th>แต้มที่ได้รับ</th>

                  {/* <th>สถานะ</th> */}
                </tr>
              </thead>
              <tbody>
                {dataCountGet.map((order) => (
                  <tr key={order.userId} class="text-center">
                    <td>{order.userId}</td>
                    <td>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Avatar src={order.avatar} />
                      </Box>
                    </td>
                    <td>{order.username}</td>
                    <td>{format(new Date(order.date), "dd MMM yyyy")}</td>
                    <td>{order.time}</td>
                    <td>10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
}
