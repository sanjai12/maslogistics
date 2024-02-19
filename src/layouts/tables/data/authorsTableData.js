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
// import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

export default function data(record) {
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

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
          <Icon>view</Icon>
        </MDTypography>
      ),
    }));
  };

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
    rowData: loadRows(record),

    // rows: [
    //   {
    //     company: <Author image={team2} name="John Michael" email="john@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="InBound" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         23/04/18
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Chennai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Colombo
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         <Icon onClick={handleClickOpen}>download</Icon>
    //         {dialog()}
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     company: <Author image={team3} name="Alexa Liras" email="alexa@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="InBound" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         11/01/19
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Chennai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Durban
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         <Icon onClick={handleClickOpen}>download</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     company: <Author image={team4} name="Laurent Perrier" email="laurent@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="OutBound" color="warning" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         19/09/17
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Chennai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Sydney
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         <Icon onClick={() => alert()}>download</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     company: <Author image={team3} name="Michael Levi" email="michael@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="OutBound" color="warning" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         24/12/08
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Chennai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Alaska
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         <Icon onClick={() => alert()}>download</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     company: <Author image={team3} name="Richard Gran" email="richard@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="OutBound" color="warning" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         04/10/21
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Mumbai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Red Sea
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         <Icon onClick={() => alert()}>download</Icon>
    //       </MDTypography>
    //     ),
    //   },
    //   {
    //     company: <Author image={team4} name="Miriam Eric" email="miriam@maslogistics.com" />,
    //     function: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="OutBound" color="warning" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     status: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     employed: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         14/09/20
    //       </MDTypography>
    //     ),
    //     origin: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Mumbai
    //       </MDTypography>
    //     ),
    //     destination: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         Colombo
    //       </MDTypography>
    //     ),
    //     action: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         {/* <Icon>more_vert</Icon> */}
    //         <Icon onClick={() => alert()}>download</Icon>
    //       </MDTypography>
    //     ),
    //   },
    // ],
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

export const loadRows = (record = []) => {
  return record?.map((data) => ({
    company: <Author image={team2} name={data?.company} email={data?.email} />,
    type: (
      <MDTypography component="a" href="#" color="text">
        <Icon>{data.type === "sea" ? `sailing` : `flight`}</Icon>
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
          <MDBadge badgeContent="YES" color="dark" variant="gradient" size="sm" />
        ) : (
          <MDBadge badgeContent="NO" color="success" variant="gradient" size="sm" />
        )}
      </MDBox>
    ),
    containerCount: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {calculatePkg(data?.quoteItems || [])}
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
        <Icon>visibility</Icon>
      </MDTypography>
    ),
  }));
};

export const tableData = {
  column: [
    { Header: "Company", accessor: "company", align: "left" },
    { Header: "mode", accessor: "type", align: "left" },
    { Header: "Cargo type", accessor: "cargoType", align: "center" },
    { Header: "Shipping Date", accessor: "shippingDate", align: "center" },
    { Header: "Dangerous", accessor: "dangerous", align: "center" },
    { Header: "No of Pkg/Container", accessor: "containerCount", align: "center" },
    { Header: "Quote Date", accessor: "createdAt", align: "center" },
    { Header: "Origin", accessor: "polName", align: "center" },
    { Header: "Destination", accessor: "podName", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ],
};
