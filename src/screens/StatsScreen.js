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
import { getLastDateOpened, setLastDateOpened, addLastDateOpenedDoc, getDates, addDate, addDatesDoc} from "../dbFunctions/StatsFunctions";

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount =  () => {
    addDatesDoc();
    addLastDateOpenedDoc();
  }

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            Statistics
          </Text>
          <View style={[Grid.col, Grid.alignCenter]}>
            <Text style={[styles.headerText, styles.lStreak]} h5>
              Longest Streak: 3 days
            </Text>
            <Text style={[styles.headerText, styles.perfect]} h5>
              Perfect Days: 3
            </Text>
            <Text style={[styles.headerText, styles.partial]} h5>
              Partial Days: 2
            </Text>
            <Text style={[styles.headerText, styles.skipped]} h5>
              Skipped Days: 3
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
            markedDates={{
              "2020-04-20": { color: "#4ee44e" },
              "2020-04-21": { color: "#4ee44e" },
              "2020-04-19": { color: "#4ee44e" },

              "2020-04-17": { color: "#4e99e4" },
              "2020-04-18": { color: "#4e99e4" },

              "2020-04-14": { color: "#e44e4e" },
              "2020-04-15": { color: "#e44e4e" },
              "2020-04-16": { color: "#e44e4e" }
            }}
            // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
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
