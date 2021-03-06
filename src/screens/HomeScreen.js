import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Picker
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Text, Button, Icon, Radio } from "galio-framework";

import Week from "../classes/Week";
import Habit from "../classes/Habit";
import Node from "../classes/Node";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";

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
import {
  Habits,
  HabitComponents,
  changeHabits,
  numCompleted,
  numSkipped
} from "../state/Habits";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import IconSelector from "../classes/IconSelector";
import ColorSelector from "../classes/ColorSelector";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",

      newHabitTitle: "A new habit",
      newHabitDescription: "...",

      modalVisible: false,
      habits: HabitComponents,
      displayedHabits: {},

      numCompleted: 0,
      // Needs to be 1 to avoid extremely tricky divide by zero bug
      numSkipped: 1,
      iconName: "back",
      changeFunction: "",
      iconColor: "orange"
    };
  }
  deleteHabit = habitID => {
    removeHabit(habitID);
    getHabits(this.showHabits);
  };
  navigate = (habitID, title, description) => {
    this.props.navigation.navigate("HabitStatsScreen", {
      habitID: habitID,
      title: title,
      description: description
    });
  };
  saveNewHabit = (title, description, iconName, color) => {
    addHabit(title, description, iconName, color);
  };
  setCircle = (numC, numS) => {
    console.log("set Circle");
    console.log(numC + " " + numS);
    console.log((100 * numC) / (numC + numS));
    // this.setState({ habits: HabitComponents });
    this.setState({ numCompleted: numC, numSkipped: numS });
    // this.circularProgress.animate(100 * numC / (numC + numS), 2000);
    // changeHabits(habits, this.deleteHabit, this.navigate, this.setCircle);
    this.forceUpdate();
  };

  setHabits = (habits, withCheck) => {
    let formattedHabits = {};
    changeHabits(habits, this.deleteHabit, this.navigate, this.setCircle);
    // this.setState({habitDocs: habits});
    // console.log("setHabits");
    //  console.log(habits);
    //  console.log(this.state.habitDocs);
    this.setState({ habits: HabitComponents });
    this.forceUpdate();

    if (withCheck) {
      this.startupCheck();
    }
  };
  showHabits = habits => {
    changeHabits(habits, this.deleteHabit, this.navigate, this.setCircle);
    this.setState({ displayedHabits: HabitComponents });
    this.setState({ habits: HabitComponents });
    // this.setState({habitDocs: habits});
  };

  setup = lastDateOpenedDoc => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0, 0);
    if (lastDateOpenedDoc.length > 0) {
      if (this.state.habits != {}) {
        let lastDate = lastDateOpenedDoc[0]["lastDateOpened"];

        const numMillisecondsInDay = 24 * 60 * 60 * 1000;

        const daysPast =
          (currentDate.getTime() - lastDate.getTime()) / numMillisecondsInDay;
        if (daysPast == 0) {
          getHabits(this.showHabits);
          return;
        }
        let skippedDates = [];

        for (let i = daysPast; i > 0; i--) {
          skippedDates.push(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            )
          );
        }
        let completedDate;
        let completedArray = [];
        for (let habitKey of Object.keys(this.state.habits)) {
          if (this.state.habits[habitKey]["props"]["completed"]) {
            completedArray.push(true);
            completedDate = skippedDates.splice(0, 1);
            addSkipped(
              this.state.habits[habitKey]["props"]["id"],
              skippedDates
            );
            addCompleted(
              this.state.habits[habitKey]["props"]["id"],
              completedDate
            );
            updateHabit(
              this.state.habits[habitKey]["props"]["id"],
              { completed: false },
              {}
            );
            skippedDates.splice(0, 0, completedDate[0]);
          } else {
            completedArray.push(false);
            addSkipped(
              this.state.habits[habitKey]["props"]["id"],
              skippedDates
            );
          }
        }
      }

      currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0, 0);
      setLastDateOpened(currentDate);
      getHabits(this.showHabits);
    } else {
      console.log("Nothing exists, first start");
      destroyEverything();
      addLastDateOpenedDoc();
      addDatesDoc();
    }
  };
  startupCheck = () => {
    getLastDateOpened(this.setup);
  };

  componentDidMount = () => {
    // destroyEverything();
    getHabits(this.setHabits, true);

    const update = this.props.navigation.addListener("focus", () => {
      this.setState({ habits: HabitComponents });
      this.setState({ displayedHabits: HabitComponents });

      this.forceUpdate();
    });
  };
  changeCurrentIcon = (iconName, changeFunction) => {
    this.setState({ iconName });
    if (this.state.changeFunction !== "") {
      this.state.changeFunction();
    }
    this.setState({ changeFunction });
  };

  colorChange = newColor => {
    this.setState({ iconColor: newColor });
  };

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h5>
            Today
          </Text>

          <Button
            onlyIcon
            icon="question"
            iconFamily="antdesign"
            iconSize={16}
            color="warning"
            iconColor="#fff"
            style={styles.questionButton}
            onPress={() => {
              this.setState({ questionModalVisible: true });
            }}
          ></Button>

          <Week navigation={this.props.navigation} habitDocs={Habits} />
          <View style={[Grid.row]}>
            <AnimatedCircularProgress
              style={styles.circle}
              size={40}
              width={3}
              fill={
                100 *
                (this.state.numCompleted /
                  (this.state.numCompleted + this.state.numSkipped))
              }
              tintColor="#FF5888"
              onAnimationComplete={() =>
                console.log(
                  "onAnimationComplete: " +
                    this.state.numCompleted +
                    " " +
                    this.state.numSkipped
                )
              }
              backgroundColor="#e3e3e3"
              ref={ref => (this.circularProgress = ref)}
            />
            <Text
              style={{
                position: "absolute",
                right: "5.6%",
                top: -37
              }}
            >
              {new Date().getDate()}
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              flex: 1
            }}
            style={styles.scrollView}
          >
            {Object.values(this.state.displayedHabits)}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.questionModalVisible}
              onRequestClose={() => {
                this.setState({ questionModalVisible: false });
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({
                    questionModalVisible: false
                  });
                }}
              >
                <View style={[Grid.row, Grid.justifyCenter, { flex: 1 }]}>
                  <Text>
                    Swipe right to complete habits. Swipe again to undo it.
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <View style={[styles.modalView, Grid.alignStretch]}>
                <View backgroundColor={this.state.iconColor}>
                  <Text style={[styles.headerText, { paddingTop: 50 }]} h5>
                    New Habit
                  </Text>
                  <TouchableHighlight
                    onPress={() => {
                      this.setState({
                        modalVisible: false
                      });
                    }}
                    style={styles.closeModal}
                  >
                    <Text p style={styles.topButtons}>
                      Cancel
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    size="small"
                    style={styles.addHabitButton}
                    onPress={() => {
                      this.saveNewHabit(
                        this.state.newHabitTitle,
                        this.state.newHabitDescription,
                        this.state.iconName,
                        this.state.iconColor
                      );
                      getHabits(this.showHabits);
                      this.setState({
                        modalVisible: false
                      });
                      this.setState({
                        newHabitTitle: "A new habit",
                        newHabitDescription: "..."
                      });
                    }}
                  >
                    <Text style={styles.save}>Save</Text>
                  </TouchableHighlight>

                  
                </View>
                <View style={styles.name}>
                    <Text>Name</Text>
                    <Input
                      placeholder="e.g. Run"
                      onChangeText={text =>
                        this.setState({
                          newHabitTitle: text
                        })
                      }
                    />
                  </View>
                <View style={styles.details}>
                  <Text>Description</Text>
                  <Input
                    placeholder="e.g. Jog for 30 minutes around block"
                    onChangeText={text =>
                      this.setState({
                        newHabitDescription: text
                      })
                    }
                  />

                  <Text>Color</Text>

                  <ColorSelector
                    colorChange={this.colorChange}
                    style={styles.colorSelector}
                  />

                  <Text style={styles.icon}>Icon</Text>
                  <IconSelector
                    iconColor={this.state.iconColor}
                    changeCurrentIcon={this.changeCurrentIcon}
                    style={styles.iconSelector}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>

          <View style={[Grid.row, Grid.justifyCenter]}>
            <Button
              onlyIcon
              icon="plus"
              iconFamily="antdesign"
              iconSize={30}
              color="warning"
              iconColor="#fff"
              style={styles.plusButton}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            >
              warning
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  iconSelector: {
    height: 500
  },

  colorSelector: {
    height: 50
  },

  scrollView: {
    //paddingBottom: 90,
  },
  plusButton: {
    top: -180,
    width: 40,
    height: 40,
    marginTop: 15
  },

  scrollView: {
    height: "100%"
  },
  circle: {
    position: "absolute",
    right: "2.12%",
    top: -48.5
  },

  headerText: {
    margin: 0,
    textAlign: "center",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 20
  },

  modalView: {
    height: "100%",
    width: "100%",
    margin: 0,
    backgroundColor: "white",
    padding: 0
    // alignItems: "center"
  },

  topButtons: {
    fontSize: 18
  },

  addHabitButton: {
    position: "absolute",
    right: "2%",
    top: 30,
    width: 70,
    height: 40,
    marginTop: 15,
    marginBottom: 20,
    paddingBottom: 20,
    backgroundColor: "transparent"
  },

  closeModal: {
    position: "absolute",
    left: "2%",
    top: 30,
    width: 70,
    height: 40,
    marginTop: 15,
    backgroundColor: "transparent"
  },

  save: {
    position: "absolute",
    right: 7,
    top: 8,
    fontSize: 18
  },

  temp: {
    height: "100%"
  },

  name: {
    paddingTop: 30,
    paddingLeft: "4%",
    paddingRight: "4%"
  },

  details: {
    padding: 10
  },

  icon: {
    padding: 0
  },

  questionButton: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 12.5,
    top: 25
  }
});
