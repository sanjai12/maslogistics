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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/signin-image.jpg";
import MDSnackbar from "components/MDSnackbar";
import useLogin from "services/useLogin";

const Basic = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const { error, loggedIn, login } = useLogin();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleAdmin = () => setAdmin(!admin);

  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const [errorSB, setErrorSB] = useState(false);
  const [msg, setMsg] = useState("");

  const openErrorSB = (message) => {
    setMsg(message);
    setErrorSB(true);
  };
  const closeErrorSB = () => {
    setErrorSB(false);
    setMsg("");
  };
  const navigate = useNavigate();

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Warning!"
      content={msg}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleSubmit = () => {
    if (username && password) {
      login(username, password);
    } else {
      openErrorSB("Fill the username and password!");
    }
  };

  const checkRole = () => {
    const role = localStorage.getItem('role');
    if(role.includes('ROLE_USER')){
      navigate("../../quotes");
    }else{
      navigate("../../dashboard");
    }
  }

  useEffect(() => {
    if (loggedIn) {
      checkRole();
    }
  }, [loggedIn]);

  useEffect(()=>{
    if(localStorage.getItem('username')){
      checkRole();
    }
  })

  useEffect(() => {
    if (error) {
      openErrorSB(error);
    }
  }, [error]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={username}
                onChange={handleUsername}
                label="Username"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={password}
                onChange={handlePassword}
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={admin} onChange={handleAdmin} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleAdmin}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Admin Login
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                style={{ cursor: "pointer" }}
                onClick={handleSubmit}
              >
                sign in
              </MDButton>
              {renderErrorSB}
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default Basic;
