import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";


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

import HabitManager from "../classes/HabitManager";
import { changeHabits, HabitManagers } from "../state/Habits";

import Tooltip from "react-native-walkthrough-tooltip";
import { FirstStart } from "../state/FirstStart";

export default class HabitManagerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      newHabitTitle: "A new habit",
      newHabitDescription: "default description",
      habitList: {},
      toolTip1: true
    };
  }
  saveNewHabit = (title, description) => {
    addHabit(title, description);
  };
  deleteHabit = habitID => {
    removeHabit(habitID);
    getHabits(this.displayHabits);
  };
  navigate = (habitID, title, description) => {
    this.props.navigation.navigate("HabitStatsScreen", {
      habitID: habitID,
      title: title,
      description: description
    });
  };
  displayHabits = habits => {
    let formattedHabits = {};

    if (habits != {}) {
      changeHabits(habits, this.deleteHabit, this.editHabit, this.navigate);
      this.setState({ habitList: HabitManagers });
    }
  };
  saveNewHabit = (title, description) => {
    addHabit(title, description);
  };
  deleteHabit = habitID => {
    removeHabit(habitID);
    getHabits(this.displayHabits);
  };
  displayHabits = habits => {
    console.log(habits);
    let formattedHabits = {};

    if (habits != {}) {
      changeHabits(habits, this.deleteHabit, this.navigate);
      this.setState({ habitList: HabitManagers });
    }
  };

  componentDidMount = () => {
    // this.startupCheck();
    getHabits(this.displayHabits);
    const update = this.props.navigation.addListener("focus", () => {
      this.setState({ habitList: HabitManagers });
      this.forceUpdate();
    });
    if (FirstStart) {
      this.setState({ toolTip1: true });
    }
  };

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h5>
            Habits
          </Text>

          <Tooltip
            isVisible={this.state.toolTip1}
            content={
              <Text>Tap on a habit to view its individual statistics</Text>
            }
            placement="top"
            onClose={() => this.setState({ toolTip1: false })}
            // The function the library uses to measure the height of the component
            // is slightly off on Android. Without this top adjustment, the copy of the
            // element is rendered slightly above where it should be
            topAdjustment={
              Platform.OS === "android" ? -StatusBar.currentHeight : 0
            }
            showChildInTooltip={false}
          >
            {Object.values(this.state.habitList)}
          </Tooltip>
          <View style={[Grid.row, Grid.justifyCenter]}>
            <Button
              onlyIcon
              icon="plus"
              iconFamily="antdesign"
              iconSize={30}
              color="warning"
              iconColor="#fff"
              style={{ width: 40, height: 40 }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            >
              warning
            </Button>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <View style={[Grid.row, Grid.justifyCenter, { flex: 1 }]}>
                <View
                  style={[
                    Grid.col,
                    Grid.justifyCenter,
                    styles.modalView,
                    Grid.alignStretch
                  ]}
                >
                  <View
                    style={[Grid.col, Grid.justifyCenter, Grid.alignStretch]}
                  >
                    <Input
                      placeholder="e.g. Run"
                      onChangeText={text =>
                        this.setState({
                          newHabitTitle: text
                        })
                      }
                    />
                    <Input
                      placeholder="e.g. Jog for 30 minutes around block"
                      onChangeText={text =>
                        this.setState({
                          newHabitDescription: text
                        })
                      }
                    />
                  </View>
                  <View style={[Grid.row, Grid.justifyCenter]}>
                    <Button
                      size="small"
                      onPress={() => {
                        this.saveNewHabit(
                          this.state.newHabitTitle,
                          this.state.newHabitDescription
                        );
                        getHabits(this.displayHabits);
                        this.setState({
                          modalVisible: false
                        });
                      }}
                    >
                      <Text>Add goal</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  headerText: {
    margin: 10,
    textAlign: "center",
    fontWeight: "500",
    paddingTop: 20
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
