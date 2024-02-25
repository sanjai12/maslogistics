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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import usePortDetails from "services/usePortDetail";
import { Box } from "@mui/material";



export const tableData = {
    column: [
      { Header: "ID", accessor: "id", align: "left" },
      { Header: "Code", accessor: "packingCode", align: "left" },
      { Header: "Port Name", accessor: "packingName", align: "left" },
      { Header: "Country", accessor: "countryName", align: "center" },
    ],
  };

  export const loadRows = (record = []) => {
    return record?.map((data) => ({
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.id}
        </MDTypography>
      ),
      packingCode: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.packingCode}
        </MDTypography>
      ),
      packingName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <Box
              component='li'
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            >
              <img
                loading='lazy'
                width='20'
                srcSet={`https://flagcdn.com/w40/${data?.countryCode.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${data?.countryCode.toLowerCase()}.png`}
                alt=''
              />
              {data?.packingName}
            </Box>
        </MDTypography>
      ),
      countryName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {data?.countryName}
        </MDTypography>
      ),
      
    }));
  };

function Ports() {
  const { response : seaResponse } = usePortDetails('Sea');
  const { response : airResponse } = usePortDetails('Air');


  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  AirPorts
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns: tableData.column,
                    rows: airResponse ? loadRows(airResponse) : [],
                  }}
                  isSorted={false}
                  entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
                  showTotalEntries={true}
                  noEndBorder
                  canSearch={true}
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Sea Ports
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                <DataTable
                  table={{
                    columns: tableData.column,
                    rows: seaResponse ? loadRows(seaResponse) : [],
                  }}
                  isSorted={false}
                  entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
                  showTotalEntries={true}
                  noEndBorder
                  canSearch={true}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Ports;
