import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";
import {
  addGoal,
  getGoals,
  removeGoal,
  deleteAllGoals,
  updateGoal
} from "../dbFunctions/GoalFunctions.js";
import {
  addHabit,
  getHabits,
  removeHabit,
  deleteAllHabits,
  updateHabit
} from "../dbFunctions/HabitFunctions.js";
import {
  addDatesDoc,
  addLastDateOpenedDoc,
  destroyEverything,
  getLastDateOpened,
  addDate
} from "../dbFunctions/StatsFunctions";

export default class HabitStatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={Grid.root}>
        <Text>Hello</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("HabitManagerScreen");
          }}
        ></Button>
      </View>
    );
  }
}
let styles = StyleSheet.create({});
