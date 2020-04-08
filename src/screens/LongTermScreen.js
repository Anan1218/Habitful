import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal"

export default class LongTermScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "" };
  }
  render() {
    return (
      <View style={Grid.root}>
      
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>Goals</Text>
          <LongTermGoal title={"Maintain a healthy life"} habits={2} TDs={0}/>
          <LongTermGoal title={"Startup"} habits={0} TDs={5}/>
          <LongTermGoal title={"Read and become knowledgable"} habits={2} TDs={1}/>
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  headerText: {
    margin: 10
  }
});
