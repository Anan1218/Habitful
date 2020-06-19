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
  addHabit,
  getHabits,
  removeHabit,
  deleteAllHabits,
  updateHabit,
  getHabit
} from "../dbFunctions/HabitFunctions.js";

import { Calendar } from "react-native-calendars";

import formatDateString from "../dateFunctions/formatDateString";
import calculateLongestStreak from "../dateFunctions/calculateLongestStreak";
import createMarkedDates from "../dateFunctions/createMarkedDates";

export default class HabitStatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markedDates: {},
      streak: 0,
      completedCount: 0,
      skippedCount: 0,
      completionPercent: 0
    };
  }
  displayDates = habitDoc => {
    console.log(habitDoc);
    let newMarkedDates = {};
    let streak = calculateLongestStreak(habitDoc[0]["completedDays"]);
    this.setState({ streak: streak });
    console.log(streak);

    newMarkedDates = createMarkedDates(
      "completedDays",
      habitDoc,
      newMarkedDates,
      "#4ee44e"
    );
    newMarkedDates = createMarkedDates(
      "skippedDays",
      habitDoc,
      newMarkedDates,
      "#e44e4e"
    );
    this.setState({ markedDates: newMarkedDates });
    this.setState({
      completedCount: habitDoc[0]["completedDays"].length,
      skippedCount: habitDoc[0]["skippedDays"].length
    });

    if (this.state.completedCount > 0 || this.state.skippedCount > 0) {
      this.setState({
        completionPercent: (
          (100 * this.state.completedCount) /
          (this.state.skippedCount + this.state.completedCount)
        ).toFixed(0)
      });
    }
  };
  componentDidMount = () => {
    console.log(this.props.route.params.habitID);
    getHabit(this.props.route.params.habitID, this.displayDates);
    console.log("stats screen is mounting");
    const update = this.props.navigation.addListener("focus", () => {
      getHabit(this.props.route.params.habitID, this.displayDates);
      this.forceUpdate();
    });
  };

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Button
            onlyIcon
            icon="left"
            iconFamily="antdesign"
            iconSize={30}
            color="warning"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
            onPress={() => {
              this.props.navigation.navigate("Habits", {
                screen: "HabitManagerScreen"
              });
            }}
          ></Button>
          <View style={[Grid.col, Grid.alignCenter]}>
            <Text style={[styles.headerText, styles.lStreak]} h5>
              {"Longest Streak:" + this.state.streak}
            </Text>
            <Text style={[styles.headerText, styles.completed]} h5>
              {"Perfect Days: " + this.state.completedCount}
            </Text>

            <Text style={[styles.headerText, styles.skipped]} h5>
              {"Skipped Days: " + this.state.skippedCount}
            </Text>
            <Text style={[styles.headerText, styles.skipped]} h5>
              {"Completion Percentage: " + this.state.completionPercent + "%"}
            </Text>
          </View>
          <Calendar
            onDayLongPress={day => {
              console.log("selected day", day);

              let isCompleted = false;
              let formattedDay = day.dateString;
              console.log(this.state.markedDates[formattedDay])
              if (this.state.markedDates[formattedDay] !== undefined && this.state.markedDates[formattedDay]["color"] === "#4ee44e") {
                isCompleted = true;
                console.log("isCompleted");
              }

              this.props.navigation.navigate("PastHabitScreen", {
                day: day,
                habitID: this.props.route.params.habitID,
                completed: isCompleted,
                title: this.props.route.params.title,
                description: this.props.route.params.description
              });
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"MMMM yyyy"}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            markedDates={this.state.markedDates}
            // // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
            markingType={"period"}
          />
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  headerText: {
    margin: 10
  },
  lStreak: {
    color: "#4e4ee4"
  },
  completed: {
    color: "#4ee44e"
  },
  skipped: {
    color: "#e44e4e"
  }
});
