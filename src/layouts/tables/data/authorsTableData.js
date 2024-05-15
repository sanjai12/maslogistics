/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { PDFViewer } from "@react-pdf/renderer";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
// import PDFComponent from "../PDFViewer";
import React from "react";
import { useNavigate } from "react-router-dom";
// import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

export default function Data(record) {

  const navigate = useNavigate();

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );


  // const dialog = () => (
  //   <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
  //     <AppBar sx={{ position: "relative" }}>
  //       <Toolbar>
  //         <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
  //           <MDAlertCloseIcon />
  //         </IconButton>
  //         <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
  //           PDF
  //         </Typography>
  //         <Button autoFocus color="inherit" onClick={handleClose}>
  //           Close
  //         </Button>
  //       </Toolbar>
  //     </AppBar>
  //     <PDFViewer style={{ width: "100%", height: "100vh" }}>
  //       <PDFComponent />
  //     </PDFViewer>
  //   </Dialog>
  // );

  const calculatePkg = (items) => {
    let count = 0;
    items.forEach((field) => {
      count += field.containerQty ? Number(field?.containerQty) : Number(field?.totalNoOfPkg);
    });

    return count;
  };

  const loadRows = (record) => {
    record.map((data) => ({
      company: <Author image={team2} name={data?.company} email={data?.email} />,
      mode: (
        <MDTypography component="a" href="#" color="text">
          <Icon>{data.type === "sea" ? `flight` : `boat`}</Icon>
        </MDTypography>
      ),
      cargoType: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.cargoType}
        </MDTypography>
      ),
      shippingDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.shippingDate}
        </MDTypography>
      ),
      dangerous: (
        <MDBox ml={-1}>
          {data?.dangerous === "Yes" ? (
            <MDBadge badgeContent="YES" color="red" variant="gradient" size="sm" />
          ) : (
            <MDBadge badgeContent="NO" color="success" variant="gradient" size="sm" />
          )}
        </MDBox>
      ),
      containerCount: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {calculatePkg(data?.quoteItems)}
        </MDTypography>
      ),
      createdAt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.createdAt}
        </MDTypography>
      ),
      polName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.polName}
        </MDTypography>
      ),
      podName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.podName}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Icon onClick={()=>alert("open dialog")}>view</Icon>
        </MDTypography>
      ),
    }));
  };

  const callback=(data)=>{
    navigate('../quoteDetail');
  }


  return {
    columns: [
      { Header: "Company", accessor: "company", align: "left" },
      { Header: "mode", accessor: "type", align: "left" },
      { Header: "Cargo type", accessor: "cargoType", align: "center" },
      { Header: "Shipping Date", accessor: "shippingDate", align: "center" },
      { Header: "Dangerous", accessor: "status", align: "center" },
      { Header: "No of Pkg/Container", accessor: "containerCount", align: "center" },
      { Header: "Quote Date", accessor: "createdAt", align: "center" },
      { Header: "Origin", accessor: "polName", align: "center" },
      { Header: "Destination", accessor: "podName", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rowData: loadRows(record,callback),
  };
}

export const calculatePkg = (items = []) => {
  let count = 0;
  (items || []).forEach((field) => {
    count += field.containerQty ? Number(field?.containerQty) : Number(field?.totalNoOfPkg);
  });

  return count;
};

export const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

export const loadRows = (record = [],callback) => {
  return record?.map((data) => ({
    company: <Author image={team2} name={data?.company} email={data?.email} />,
    type: (
      <MDTypography component="a" href="#" color="text">
        <Icon>{data.type === "sea" ? `sailing` : `flight`}</Icon>
      </MDTypography>
    ),
    cargoType: data?.cargoType,
    shippingDate: data?.shippingDate,
    dangerous: (
      <MDBox ml={-1}>
        {data?.dangerous === "Yes" ? (
          <MDBadge badgeContent="YES" color="dark" variant="gradient" size="sm" />
        ) : (
          <MDBadge badgeContent="NO" color="success" variant="gradient" size="sm" />
        )}
      </MDBox>
    ),
    containerCount: calculatePkg(data?.quoteItems || []),
    createdAt: data?.createdAt,
    polName: data?.polName,
    podName: data?.podName,
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        <Icon onClick={()=>callback(data)}>visibility</Icon>
      </MDTypography>
    ),
  }));
};

export const tableData = {
  column: [
    { Header: "Company", accessor: "company", align: "left" },
    { Header: "mode", accessor: "type", align: "left" },
    { Header: "Cargo type", accessor: "cargoType", align: "left" },
    { Header: "Shipping Date", accessor: "shippingDate", align: "left" },
    { Header: "Dangerous", accessor: "dangerous", align: "left" },
    { Header: "No of Pkg/Container", accessor: "containerCount", align: "left" },
    { Header: "Quote Date", accessor: "createdAt", align: "left" },
    { Header: "Origin", accessor: "polName", align: "left" },
    { Header: "Destination", accessor: "podName", align: "left" },
    { Header: "action", accessor: "action", align: "left" },
  ],
};
