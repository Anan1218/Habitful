import { StyleSheet } from "react-native";

const Grid = StyleSheet.create({
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyCenter: {justifyContent: "center"},
  justifyContentSpaceBetween : {justifyContent: "space-between"},
  justifyContentSpaceAround : {justifyContent: "space-around"},
  justifyContentSpaceEvenly : {justifyContent: "space-evenly"},
  alignCenter: {alignItems: "center"},
  alignStretch: {alignItems: "stretch"},
  alignEnd: {alignItems: "flex-end"},
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",

    alignContent: "flex-start",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "stretch",

    alignContent: "flex-start",
    

  },
  root: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 30
  }
});

export default Grid;
