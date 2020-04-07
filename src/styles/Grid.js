import { StyleSheet } from "react-native";

const Grid = StyleSheet.create({
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyCenter: {justifyContent: "center"},
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    

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
