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

import {
  addDatesDoc,
  addLastDateOpenedDoc,
  destroyEverything,
  getLastDateOpened,
  addDate,
  addPartialDay,
  addPerfectDay,
  addSkippedDay,
  setLastDateOpened,
  removeSkippedDay
} from "../dbFunctions/StatsFunctions";

import {
  addHabit,
  getHabits,
  removeHabit,
  deleteAllHabits,
  updateHabit,
  addSkipped,
  addCompleted,
  removeCompleted,
  removeSkipped
} from "../dbFunctions/HabitFunctions.js";

import PastHabit from "../classes/PastHabit";

export default class PastHabitScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {
    console.log(this.props.route.params.day);
  };
  updateDate = (active) => {
    console.log("updating Date " +active+ " " + this.props.route.params.day);
    const numMillisecondsInDay = 24 * 60 * 60 * 1000;
    if (active) {
      // The day object passed by  react-native-calendars is not a Date. The timestamp actually represents the previous day
      // so you have to add numMillisecondsInDay so the timestamp represents the correct date
      let day = new Date (this.props.route.params.day.timestamp + numMillisecondsInDay);
      day.setHours(0, 0, 0, 0, 0);
      removeSkipped(this.props.route.params.habitID, day);
      addCompleted(this.props.route.params.habitID, [day]);
    } else {
      let day = new Date (this.props.route.params.day.timestamp + numMillisecondsInDay);
      day.setHours(0, 0, 0, 0, 0);
      removeCompleted(this.props.route.params.habitID, day);
      addSkipped(this.props.route.params.habitID, [day]);
    }
  }
  // this.props.route.params.day is not a Date, it is just an object
  // the PastHabit object is purposefully not given a habitID so it does not change anything on its own
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            {this.props.route.params.day.dateString}
          </Text>
          <PastHabit updateDate = {this.updateDate} title={this.props.route.params.title} description = {this.props.route.params.description} completed={this.props.route.params.completed}/>
        </View>
        
      </View>
    );
  }
}

let styles = StyleSheet.create({
  headerText: {
    margin: 10,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
