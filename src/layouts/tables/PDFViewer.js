import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    margin: 12,
    fontSize: 15,
    textAlign: "center",
  },
});

const PDFComponent = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
      <div style={{ padding: "40px", display: "flex", justifyContent: "space-between" }}>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i <= 8).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                      <Text style={styles.text}>{`${fields?.toString()?.toUpperCase()} : ${data[fields] || ''?.toString()?.toUpperCase()}`}</Text>
                    </div>)}
                </div>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i >= 9 && i <= 16).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                      <Text style={styles.text}>{`${fields?.toString()?.toUpperCase()} : ${data[fields] || ''?.toString()?.toUpperCase()}`}</Text>
                    </div>)}
                </div>
                <div>
                  {Object.keys(data).filter((d, i) => d !== "quoteItems" && i >= 17).map(fields =>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                      <Text style={styles.text}>{`${fields?.toString()?.toUpperCase()} : ${data[fields] || ''?.toString()?.toUpperCase()}`}</Text>
                    </div>)}
                </div>
              </div>
      </View>
    </Page>
  </Document>
);

export default PDFComponent;
