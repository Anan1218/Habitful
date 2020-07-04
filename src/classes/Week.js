import React, { Component } from "react";
import { Input, Block, Text, Button } from "galio-framework";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import Grid from "../styles/Grid";

import Node from "./Node";

import calcStats from "../dateFunctions/calcStats";
import { getHabits } from "../dbFunctions/HabitFunctions";
import formatDateString from "../dateFunctions/formatDateString";
import { Habits } from "../state/Habits";
export class Week extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      nodes: [],
      completionArray: [],
      lastSix: [],
      test: [<Text>Initial</Text>]
    };
  }

  fillCompletionArray = habits => {
    console.log("week");
    console.log(habits);
    let stats = calcStats(habits, {});

    console.log(stats.markedDates);
    let completionArray = [];
    for (let i = 0; i < 6; i++) {
      completionArray.push("skipped");
    }
    let nodes = [];
    let today = new Date();
    let fullToday = new Date();
    today.setDate(today.getDate() - 6);
    fullToday.setDate(fullToday.getDate() - 6);
    for (let i = 0; i < 6; i++) {
      fullToday.setDate(today.getDate() + i);
      for (let markedDate in stats.markedDates) {
        console.log(formatDateString(fullToday));
        console.log(markedDate);
        if (formatDateString(fullToday) === markedDate) {
          if (stats.markedDates[markedDate]["color"] === "#4ee44e") {
            completionArray[i] = "perfect";
          } else if (stats.markedDates[markedDate]["color"] === "#4e99e4") {
            completionArray[i] = "partial";
          }
        }
      }

      // This complicated syntax is to wrap the date around: so that is displays "1" instead of "32", for example. 
      // It creates a new date with the current year, month, and date plus a number. The Date constructor
      // automatically wraps that date to the next month if necessary, checking for the number of days in the month,
      // leap years, etc.
      nodes.push([(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)).getDate()]);
    }

    let temp = nodes.slice(nodes.length - 6);
    let lastSix = nodes.slice(nodes.length - 6).map((e, i) => {
      console.log("last Six");
      return (
        <View style={styles.node}>
          <Node status={completionArray[i]} date={nodes[i]} key={i} />
        </View>
      );
    });

    this.setState({ lastSix });

    console.log(nodes)
    console.log(completionArray)
  };

  componentDidMount = () => {
    this._isMounted = true;
    const update = this.props.navigation.addListener("focus", () => {
      if (this._isMounted) {
        getHabits(this.fillCompletionArray, false);
      } else {
        console.log("can't getHabits, not mounted");
      }
    });
  };
  componentWillUnmount() {
    console.log("will unmount");
    this._isMounted = false;
  }
  render() {
    return (
      <View>
        <View style={[Grid.row, Grid.justifyCenter]}>
          {this.state.lastSix}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  node: {
    width: "10%",
    height: 40,
    margin: "2.12%",
    marginTop: 0
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10
  }
});

export default Week;
