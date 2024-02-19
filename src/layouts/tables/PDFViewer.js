import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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

const PDFComponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.text}>Name: {"Suresh"}</Text>
        <Text style={styles.text}>Email: {"Suresh@asdasd.com"}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFComponent;
