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
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";

import { Input, Block, Text, Button } from "galio-framework";

import Week from "../classes/Week";
import Habit from "../classes/Habit";
import Node from "../classes/Node";

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
import { HabitComponents, changeHabits } from "../state/Habits";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",

            newHabitTitle: "",
            newHabitDescription: "default description",

            modalVisible: false,
            habits: HabitComponents,
            displayedHabits: {},
        };
    }
    setHabits = (habits, withCheck) => {
        // console.log(habits);
        let formattedHabits = {};
        // if (habits != {}) {
        changeHabits(habits);

        this.setState({ habits: HabitComponents });
        console.log("in displayhabits");
        console.log(HabitComponents);
        console.log(this.state.habits);
        // }
        if (withCheck) {
            this.startupCheck();
        }
        this.forceUpdate();
    };
    showHabits = (habits) => {
        changeHabits(habits);
        this.setState({ displayedHabits: HabitComponents });
        this.setState({ habits: HabitComponents });
    };

    setup = (lastDateOpenedDoc) => {
        console.log("setup");
        // this.setState({ habits: HabitComponents });
        console.log(this.state.habits);
        //   let currentDate = new Date(2020, 3, 29); // temp
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0, 0);
        // console.log("setup");
        // console.log(this.state.habits);
        if (lastDateOpenedDoc.length > 0) {
            if (this.state.habits != {}) {
                console.log("running this part of setup");
                let lastDate = lastDateOpenedDoc[0]["lastDateOpened"];

                const numMillisecondsInDay = 24 * 60 * 60 * 1000;

                const daysPast =
                    (currentDate.getTime() - lastDate.getTime()) /
                    numMillisecondsInDay;
                if (daysPast == 0) {
                    getHabits(this.showHabits);
                    return;
                }
                let skippedDates = [];

                for (let i = daysPast; i > 0; i--) {
                    // TODO check if wraps around
                    skippedDates.push(
                        new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate() - i
                        )
                    );
                }
                //   console.log(skippedDates);
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
                // console.log(completedArray);
                if (
                    completedArray.includes(false) &
                    !completedArray.includes(true)
                ) {
                    addSkippedDay(skippedDates);
                } else if (
                    completedArray.includes(true) &
                    !completedArray.includes(false)
                ) {
                    completedDate = skippedDates.splice(0, 1);
                    addPerfectDay(completedDate);
                    addSkippedDay(skippedDates);
                } else if (completedArray.length > 0) {
                    //   console.log(skippedDates);
                    completedDate = skippedDates.splice(0, 1);
                    //   console.log(completedDate);
                    //   console.log(skippedDates);
                    addPartialDay(completedDate);
                    addSkippedDay(skippedDates);
                }

        for (let i = daysPast; i > 0; i--) {

          skippedDates.push(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate() - i
            )
          );
        }
        // let completedDate;
        completedArray = [];
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
        if (completedArray.includes(false) & !completedArray.includes(true)) {
          addSkippedDay(skippedDates);
        } else if (
          completedArray.includes(true) & !completedArray.includes(false)
        ) {
          completedDate = skippedDates.splice(0, 1);
          addPerfectDay(completedDate);
          addSkippedDay(skippedDates);
        } else if (completedArray.length > 0) {
          completedDate = skippedDates.splice(0, 1);
          addPartialDay(completedDate);
          addSkippedDay(skippedDates);
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

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h5>
                        Today
                    </Text>

                    <Week />
                    {Object.values(this.state.displayedHabits)}

                    {/* <Habit></Habit> */}

                    <View style={[Grid.row, Grid.justifyCenter]}>
                        <Button
                            onlyIcon
                            icon="plus"
                            iconFamily="antdesign"
                            iconSize={30}
                            color="warning"
                            iconColor="#fff"
                            style={{ width: 40, height: 40, marginTop: 15 }}
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
                            <View
                                style={[
                                    Grid.row,
                                    Grid.justifyCenter,
                                    { flex: 1 },
                                ]}
                            >
                                <View
                                    style={[
                                        Grid.col,
                                        Grid.justifyCenter,
                                        styles.modalView,
                                        Grid.alignStretch,
                                    ]}
                                >
                                    <View
                                        style={[
                                            Grid.col,
                                            Grid.justifyCenter,
                                            Grid.alignStretch,
                                        ]}
                                    >
                                        <Input
                                            placeholder="e.g. Run"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    newHabitTitle: text,
                                                })
                                            }
                                        />
                                        <Input
                                            placeholder="e.g. Jog for 30 minutes around block"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    newHabitDescription: text,
                                                })
                                            }
                                        />
                                    </View>
                                    <View
                                        style={[Grid.row, Grid.justifyCenter]}
                                    >
                                        <Button
                                            size="small"
                                            onPress={() => {
                                                this.saveNewHabit(
                                                    this.state.newHabitTitle,
                                                    this.state
                                                        .newHabitDescription
                                                );
                                                getHabits(this.displayHabits);
                                                this.setState({
                                                    modalVisible: false,
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
        margin: 0,
        textAlign: "center",
        fontWeight: "500",
        paddingTop: 20,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
