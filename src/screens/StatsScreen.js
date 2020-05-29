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
import { Calendar } from "react-native-calendars";
import {
  getLastDateOpened,
  setLastDateOpened,
  addLastDateOpenedDoc,
  getDates,
  addDate,
  addDatesDoc
} from "../dbFunctions/StatsFunctions";


export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedDates: {},
      perfectCount: 0,
      partialCount: 0,
      skippedCount: 0,
      streak: 0
    };
  }

  formatDateString = date => {
    let dateString = "";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    dateString += year + "-";
    if (month < 10) {
      dateString += "0";
    }
    dateString += month + "-";
    if (day < 10) {
      dateString += "0";
    }
    dateString += day;
    return dateString;
  };

  calculateLongestStreak = perfectDays => {
    if (perfectDays.length == 0) {
      return 0;
    }
    let longestStreak = 1;
    let currentStreak = 1;
    let prevTime = 0;

    const numMillisecondsInDay = 24*60*60*1000;
    perfectDays = perfectDays.sort((day1, day2) => {
      return day1.getTime() > day2.getTime();
    })
    for (let date of perfectDays) {
      console.log(this.formatDateString(date));
      // console.log(date.getTime());
      // console.log(date.getTime() - prevTime);
      
      if (date.getTime() - prevTime === numMillisecondsInDay) {
        console.log("here");
        currentStreak++;
      } else {
        
        currentStreak = 1;
      }

      if (currentStreak > longestStreak) {
        console.log("change");
        console.log(longestStreak);
        longestStreak = currentStreak;
      }
      
      console.log(currentStreak);
      prevTime = date.getTime();
    }
    
    
    return longestStreak;
  }

  displayDates = datesDocs => {
    
    let newMarkedDates = this.state.markedDates;
    let formattedDateString;

    let streak = this.calculateLongestStreak(datesDocs[0]["perfectDays"]);
    this.setState({streak: streak});

    for (let date of datesDocs[0]["perfectDays"]) {
      formattedDateString = this.formatDateString(date);
      newMarkedDates = {
        ...newMarkedDates,
        [formattedDateString]: { color: "#4ee44e" }
      };
    }

    for (let date of datesDocs[0]["partialDays"]) {
      formattedDateString = this.formatDateString(date);
      newMarkedDates = {
        ...newMarkedDates,
        [formattedDateString]: { color: "#4e99e4" }
      };
    }

    for (let date of datesDocs[0]["skippedDays"]) {
      formattedDateString = this.formatDateString(date);
      newMarkedDates = {
        ...newMarkedDates,
        [formattedDateString]: { color: "#e44e4e" }
      };
    }

    this.setState({ markedDates: newMarkedDates });
    this.setState({
      perfectCount: datesDocs[0]["perfectDays"].length,
      partialCount: datesDocs[0]["partialDays"].length,
      skippedCount: datesDocs[0]["skippedDays"].length
    });
  };

  componentDidMount = () => {
    // addDate("perfect", new Date(2020, 5, 24));
    // addDate("perfect", new Date(2020, 5, 25));
    // addDate("perfect", new Date(2020, 5, 26));

    // addDate("perfect", new Date(2020, 4, 22));
    getDates(this.displayDates);
  };

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            Statistics
          </Text>
          <View style={[Grid.col, Grid.alignCenter]}>
            <Text style={[styles.headerText, styles.lStreak]} h5>
              {"Longest Streak:" + this.state.streak}
            </Text>
            <Text style={[styles.headerText, styles.perfect]} h5>
              {"Perfect Days: " + this.state.perfectCount}
            </Text>
            <Text style={[styles.headerText, styles.partial]} h5>
              {"Partial Days: " + this.state.partialCount}
            </Text>
            <Text style={[styles.headerText, styles.skipped]} h5>
              {"Skipped Days: " + this.state.skippedCount}
            </Text>
          </View>
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
  perfect: {
    color: "#4ee44e"
  },
  partial: {
    color: "#4e99e4"
  },
  skipped: {
    color: "#e44e4e"
  }
});
