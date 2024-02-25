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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

const OrdersOverview = ({ sea, air, total }) => {
  const loadDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Orders overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem color="success" icon="notifications" title={`Goods Transported`} />
        <TimelineItem
          color="info"
          icon="flight"
          title={`${air} Flight Bookings Done`}
          dateTime={loadDate()}
        />
        <TimelineItem
          color="warning"
          icon="sailing"
          title={`${sea} Ship Port Bookings Done`}
          dateTime={loadDate()}
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title={`${total} Quotes received this month`}
          dateTime={loadDate()}
          lastItem
        />
      </MDBox>
    </Card>
  );
};

OrdersOverview.propTypes = {
  sea: Number,
  air: Number,
  total: Number,
};

export default OrdersOverview;
