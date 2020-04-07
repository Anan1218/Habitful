import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";
import LongTermPage from "./LongTermPage";
import Grid from "../styles/Grid";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          
          
            <LongTermPage />
          
        </View>
      </View>
    );
  }
}
