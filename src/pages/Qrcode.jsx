import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";
import QRCode from "react-qr-code";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Qrcode() {
  const auth = useAuthUser();
  const branchIdString = auth.branchId.toString();
  return (
    <div className="App">
      <h1>QR CODE เช็คอินประจำร้านค้า branchId:{auth.branchId}</h1>
      <QRCode value={branchIdString} />
    </div>
  );
}
