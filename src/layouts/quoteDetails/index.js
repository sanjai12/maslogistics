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
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useState } from "react";
import { AppBar, Button, Dialog, IconButton, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import { PDFViewer } from "@react-pdf/renderer";
import PDFComponent from "layouts/tables/PDFViewer";
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import useGetCurrencies from "services/useGetCurrencies";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";
import ShipmentQuoteDetails from "./ShipmentQuoteDetails";
import AirQuoteDetails from "./AirQuoteDetails";

const QuoteDetail = ({ data, onBack }) => {
  const [open, setOpen] = useState(false);
  const { currencyData } = useGetCurrencies();
  console.log(currencyData);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handleClose = () => {
    setOpen(false);
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <MDAlertCloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              PDF
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <PDFComponent data={data} />
        </PDFViewer>
      </Dialog>
      <MDTypography variant="h6" color="white">
                  <div style={{ display: "flex", alignItems: "center", cursor:"pointer", gap: 10 }} onClick={() => onBack()}>
                    <Icon style={{ cursor: "pointer" }} >arrow_back</Icon>
                    <div>Back to Details</div>
                  </div>
      </MDTypography>
      <ComponentToPrint data={data} currencyData={currencyData} onBack={onBack} handlePrint={handlePrint} ref={componentRef} />
      <div style={{textAlign:"right"}}>
      <MDButton onClick={handlePrint} style={{ margin: 5 }} variant="gradient" color="info">
                Download PDF
      </MDButton>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export class ComponentToPrint extends React.PureComponent {
  state={
    currency:null,
    amount:0,
    miscellaneous:0,
    tax:0
  }


  shouldComponentUpdate(nextProps, nextState){
    return nextState.currency !== this.state.currency || nextState.amount !== this.state.amount || 
    nextState.miscellaneous !== this.state.miscellaneous || nextProps.currencyData !== this.props.currencyData;
  };

  render() {
    const { data, onBack, currencyData,  handlePrint } = this.props;

    const loadColumns = (tableData = {}) => {
      let columns = [];
      Object.keys(tableData).forEach((field) => {
        const obj = {};
        obj['Header'] = field.toLocaleUpperCase();
        obj['accessor'] = field;
        obj['align'] = 'center';
        columns.push(obj);
      })
      return columns;
    }

    const loadRows = (tableData=[]) => {
      const rows = [];
      tableData.forEach((mapObj) => {
        let obj = {};
        Object.keys(mapObj).forEach((field)=>{
        obj[field] = (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {mapObj[field]}
        </MDTypography>);
      })
      rows.push(obj);
    })
      return rows;
    }


    const loadFinalAmount = () => {
      if(this.state.amount && this.state.currency){
      let loadAmount = data.quoteItems.length * Number(this.state.amount);
      let conversion = loadAmount * currencyData?.find(d=>d.code===this.state.currency)?.exchangeRate;
      const currencySymbol = currencyData?.find(d=>d.code===this.state.currency)?.currencySymbol || '';
      return `${currencySymbol} ${conversion + Number(this.state.miscellaneous)}`;
      }else{
        return '';
      }
    }


    return (
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
                  <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
                    <div>Quote Details</div>
                  </div>
                </MDTypography>
              </MDBox>
              <MDBox pt={3} style={{ padding: "40px", display: "flex", justifyContent: "space-between" }}>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i <= 8).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">{`${fields} :`}</MDTypography>
                      <MDTypography display="inline-block"
                        component="td"
                        style={{ fontSize: "14px" }}
                        width="max-content"
                        color="text" textTransform="uppercase">{data[fields]}</MDTypography>
                    </div>)}
                </div>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i >= 9 && i <= 16).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography display="inline-block"
                        component="td"
                        style={{ fontSize: "14px" }}
                        width="max-content"
                        color="text" textTransform="uppercase">{`${fields} :`}</MDTypography>
                      <MDTypography display="inline-block"
                        component="td"
                        style={{ fontSize: "14px" }}
                        width="max-content"
                        color="text" textTransform="uppercase">{data[fields]}</MDTypography>
                    </div>)}
                </div>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i >= 17).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography style={{ fontSize: "14px" }} display="inline-block"
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">{`${fields} :`}</MDTypography>
                      <MDTypography display="inline-block"
                        component="td"
                        width="max-content"
                        color="text" style={{ fontSize: "14px" }} textTransform="uppercase">{data[fields]}</MDTypography>
                    </div>)}
                </div>
                <br />
                
              </MDBox>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
                    <div>Quote Items</div>
                  </div>
                </MDTypography>
              </MDBox>
              {data.type.toLocaleUpperCase()!=="AIR" &&
              <MDBox pt={3} style={{ padding: "10px", paddingTop:20,display: "flex", justifyContent: "space-between" }}>
              {/* <DataTable
                entriesPerPage={false}
                  table={{
                    columns: loadColumns(data.quoteItems[0]),
                    rows: data.quoteItems ? loadRows(data.quoteItems) : [],
                  }}
                  noEndBorder
                  showTotalEntries={false}
                  canSearch={false}
                  isSorted={false}
                /> */}
                <ShipmentQuoteDetails quoteItems={data.quoteItems} loadAmountDetails={(amountValue)=>{
                  this.setState({amount:amountValue})
                }}/>
                </MDBox>}
                {data.type.toLocaleUpperCase()==="AIR" &&
                <MDBox pt={3} style={{ padding: "10px", paddingTop:20,display: "flex", justifyContent: "space-between" }}>
                <AirQuoteDetails quoteItems={data.quoteItems} loadAmountDetails={(amountValue)=>{
                  this.setState({amount:amountValue})
                }}/>
                </MDBox>}
              <br/>
              <MDBox pt={3} style={{ padding: "10px",margin:25 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 0 }}>
              <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">Select the Currency</MDTypography>
              <Select
                            labelId='demo-simple-select-label'
                            label='Select Currency'
                            style={{width:100,height:30}}
                            onChange={(event) =>
                             this.setState({currency:event.target.value})
                            }
                            id='containerType'
                            value={this.state.currency}
                          >
                            {currencyData?.map(({ code }) => (
                <MenuItem value={code}>{code}</MenuItem>
              ))}
                            </Select>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">Exchange Rate</MDTypography>
                      <MDTypography display="inline-block"
                        component="td"
                        style={{ fontSize: "14px" }}
                        width="max-content"
                        color="text" textTransform="uppercase">{currencyData?.find(d=>d.code===this.state.currency)?.exchangeRate || ''}</MDTypography>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">Miscellaneous Amount</MDTypography>
                      <MDInput type="number" value={this.state.miscellaneous} onChange={(event) => this.setState({miscellaneous:event.target.value})}
                      label="Enter amount"/>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 20, paddingBottom: 10 }}>
                      <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">Total Amount : </MDTypography>
                       <MDTypography display="inline-block"
                        style={{ fontSize: "14px" }}
                        component="td"
                        width="max-content"
                        color="text" textTransform="uppercase">{loadFinalAmount()}</MDTypography>
              </div>
              </MDBox>
              
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    )
  }
}

export default QuoteDetail;
