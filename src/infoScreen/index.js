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



// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/signin-image.jpg";
import Icon from "@mui/material/Icon";
import AnimatedButton from "components/AnimatedButton";
import { useState } from "react";
import GetQuote from '../GetQuote';

const centerStyled={
  position:"absolute",
  left:"50%",
  top:"50%",
  transform:"translate(-50%, -50%)"
}

const InfoScreen=()=> {
  const [showQuote,setShowQuote] = useState(false);

  const clickHandler = () => {
    setShowQuote(true);
  }

  return (
    <CoverLayout image={bgImage} coverHeight={'150vh'}>
      {!showQuote &&
      <div style={centerStyled}>
      <AnimatedButton clickHandler={clickHandler}><Icon sx={{ fontWeight: "bold" }}>file_open</Icon>
          &nbsp;&nbsp;&nbsp;&nbsp;Click to get quote!</AnimatedButton>
      </div>
      }
      {showQuote && <GetQuote/>}
    </CoverLayout>
  );
}

export default InfoScreen;