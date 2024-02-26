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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import useGetAllQuotes from "services/useGetAllQuotes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { data } = useGetAllQuotes();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('username')){
      navigate('../authentication/sign-in')
    }
  })

  const bookingCount = data?.length || 0;

  const checkDates = (date1, date2) => {
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    // Compare the date components
    if (year1 === year2 && month1 === month2 && day1 === day2) {
      return true;
    } else {
      return false;
    }
  };

  const todaysUser =
    data?.filter((d) => checkDates(new Date(d.createdAt), new Date())).length || 0;

  const seaEnquiry = data?.filter((d) => d.type?.toLowerCase() === "sea").length || 0;

  const airEnquiry = data?.filter((d) => d.type?.toLowerCase() === "air").length || 0;

  const barChart = {
    labels: ["Sea", "Air"],
    datasets: { label: "Enquiry", data: [seaEnquiry, airEnquiry] },
  };

  const monthData = (month) => {
    return data?.filter((d) => new Date(d.shippingDate).getMonth() === month)?.length || 0;
  };

  const yearData = (year = 0) => {
    return data?.filter((d) => new Date(d.shippingDate).getFullYear() === year)?.length || 0;
  };

  const monthWise = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Month wise Enquiry",
      data: [
        monthData(0),
        monthData(1),
        monthData(2),
        monthData(3),
        monthData(4),
        monthData(5),
        monthData(6),
        monthData(7),
        monthData(8),
        monthData(9),
        monthData(10),
        monthData(11),
      ],
    },
  };

  const yearWise = {
    labels: [
      Number(new Date()?.getFullYear()) - 2,
      Number(new Date()?.getFullYear()) - 1,
      Number(new Date()?.getFullYear()),
      Number(new Date()?.getFullYear()) + 1,
      Number(new Date()?.getFullYear()) + 2,
    ],
    datasets: {
      label: "Year Wise Enquiry",
      data: [
        yearData(Number(new Date()?.getFullYear()) - 2),
        yearData(Number(new Date()?.getFullYear()) - 1),
        yearData(Number(new Date()?.getFullYear())),
        yearData(Number(new Date()?.getFullYear()) + 1),
        yearData(Number(new Date()?.getFullYear()) + 2),
      ],
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="flight_take_off"
                title="Bookings"
                count={bookingCount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Sea Enquiry"
                count={seaEnquiry}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Air Enquiry"
                count={airEnquiry}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="New Quotes"
                count={todaysUser}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Enquiry views"
                  description="Total Enquiries"
                  date={new Date().toDateString()}
                  chart={barChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Monthly Enquiries"
                  date={new Date().toDateString()}
                  chart={monthWise}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Year Wise Enquiry"
                  description="Last Campaign Performance"
                  date={new Date().toDateString()}
                  chart={yearWise}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid> */}
            <Grid item xs={24} md={12} lg={12}>
              <OrdersOverview sea={seaEnquiry} air={airEnquiry} total={seaEnquiry + airEnquiry} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
