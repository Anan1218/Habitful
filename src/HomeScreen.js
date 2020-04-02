import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";
import JournalEntry from "./classes/JournalEntry";
import Grid from "./styles/Grid";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <View style={Grid.row} >
            <Text>Write about your day so far!</Text>
          </View>
          {/* <View style={[Grid.row]} > */}
            <JournalEntry />
          {/* </View> */}
        </View>
      </View>
    );
  }
}
