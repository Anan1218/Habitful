import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";
import LongTermPage from "./LongTermScreen";
import Grid from "../styles/Grid";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text>Home Screen</Text>
        </View>
      </View>
    );
  }
}
