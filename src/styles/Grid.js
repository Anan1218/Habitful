import {StyleSheet} from "react-native";

const Grid = StyleSheet.create({
  
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    
    

    
    alignContent: "flex-start",

    backgroundColor: "green",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    
   

    alignContent: "flex-start",

    backgroundColor: "red",
    
  },
  root: {
    backgroundColor: "#fff",
    height: "100%",
    // alignItems: "center",
    paddingTop: 30
  }
});

export default Grid;