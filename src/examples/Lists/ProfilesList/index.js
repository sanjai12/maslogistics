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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import useRoles from "services/useRoles";
import useChangeRole from "services/useChangeRole";
import MDSnackbar from "components/MDSnackbar";
import MDInput from "components/MDInput";

const ProfilesList = ({ title, shadow }) => {
  const { data } = useRoles();
  const { changeRole } = useChangeRole();

  const loadProfileRoles = (record) => {
    return record?.map(data => ({ ...data, role: data.role === "[ROLE_ADMIN]" ? "ADMIN" : "USER" }))
  }

  const [profileData, setProfileData] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const [profileInput, setProfileInput] = useState('');
  const [filteredProfileData,setFilteredProfileData] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      setProfileData(loadProfileRoles(data));
    }
  }, [data])

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const handleProfileEdit = (index) => {
    let profileEditOption = [...filteredProfileData];
    profileEditOption[index].edit = true;
    setFilteredProfileData(profileEditOption)
  }

  const handleSearchData = (value) => {
    setProfileInput(value)
    setFilteredProfileData(value?[...profileData].filter(data=>data.username.includes(value)):[]);
  }

  const handleProfileRoles = async (index, value) => {
    let profileEditOption = [...filteredProfileData];
    let userData = {
      username: profileEditOption[index].username,
      role: value === "USER" ? "ROLE_USER" : "ROLE_ADMIN",
    }
    await changeRole(userData);
    openSuccessSB();
    profileEditOption[index].edit = false;
    profileEditOption[index].role = value;
    const oldProfileDataIndex = profileData.findIndex(({username})=>username===userData.username);
    if(oldProfileDataIndex){
      const oldProfileData = [...profileData];
      oldProfileData[oldProfileDataIndex].role = value;
      setProfileData(oldProfileData);
    }
    setFilteredProfileData(profileEditOption)
  }

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content="Profile Changed successfully."
      dateTime="just now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderProfiles = (profileRecord = []) => profileRecord?.map(({ username, role, edit }, index) => (
    <MDBox key={username} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar alt="something here" shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {username}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        {!edit ? (
          <>
            <MDButton variant="text" color="info">
              {role}
            </MDButton>
            <Tooltip title="Edit Profile" placement="top">
              <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={() => handleProfileEdit(index)}>
                edit
              </Icon>
            </Tooltip>
          </>
        ) : (
          <div>
            <MDButton variant="text" color="info" onClick={() => handleProfileRoles(index, 'USER')}>
              USER
            </MDButton>
            <MDButton variant="text" color="info" onClick={() => handleProfileRoles(index, 'ADMIN')}>
              ADMIN
            </MDButton>
          </div>
        )}
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox pt={2} px={2}>
        <MDInput value={profileInput} onChange={(event) => handleSearchData(event.target.value)}
          label="Search here for profiles..." style={{ width: "100%" }} />
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles(filteredProfileData)}
        </MDBox>
      </MDBox>
      {renderSuccessSB}
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
