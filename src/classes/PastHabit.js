import React, { Component } from "react";
import { Input, Block, Text, Button } from "galio-framework";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  InputAccessoryView
} from "react-native";
import Grid from "../styles/Grid";
import Swipeable from "react-native-swipeable";
import { updateHabit } from "../dbFunctions/HabitFunctions";

export class PastHabit extends Component {
  state = {
    name: "",
    active: false
  };

  componentDidMount() {
    this.setState({ active: this.props.completed });
  }

  render() {
    return (
      <View>
        <Swipeable
          style={this.state.active ? styles.active : styles.inactive}
          leftContent={leftContent}
          rigthButtons={rigthButtons}
          onLeftActionRelease={() => {
            this.setState({ active: !this.state.active });
            // setState is not really called until after the whole function runs because of how Swipeable works
            this.props.updateDate(! this.state.active);
          }}
        >
          <Text>{this.props.title}</Text>
        </Swipeable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: "red",
    height: 50,
    margin: "2.5%"
  },

  inactive: {
    backgroundColor: "grey",
    height: 50,
    margin: "2.5%"
  }
});

const leftContent = <Text>Pull to activate</Text>;

const rigthButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>
];

export default PastHabit;
