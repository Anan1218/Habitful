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
  addHabit,
  getHabits,
  removeHabit,
  deleteAllHabits,
  updateHabit,
  getHabit
} from "../dbFunctions/HabitFunctions.js";

import { Calendar } from "react-native-calendars";


export default class HabitStatsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {markedDates: {}};
  }
  displayDates = (habitDoc) => {
    console.log(habitDoc);
  }
  componentDidMount = () => {
    console.log(this.props.route.params.habitID);
    getHabit(this.props.route.params.habitID, this.displayDates);
  }

  render() {
    return (
      <View style={Grid.root}>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Habits', {screen: 'HabitManagerScreen'});
          }}
        ></Button>
        <Calendar
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
    );
  }
}
let styles = StyleSheet.create({});
