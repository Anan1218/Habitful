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
import LongTermPage from "./LongTermScreen";
import Grid from "../styles/Grid";

import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";

import Week from "../classes/Week";
import Habit from "../classes/Habit";
import Node from "../classes/Node";

import {
    addDatesDoc,
    addLastDateOpenedDoc,
    destroyEverything,
    getLastDateOpened,
    addDate,
} from "../dbFunctions/StatsFunctions";

import {
    addHabit,
    getHabits,
    removeHabit,
    deleteAllHabits,
    updateHabit,
} from "../dbFunctions/HabitFunctions.js";
import { HabitComponents, changeHabits } from "../state/Habits";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            title: "",
            modalVisible: false,
            habits: {},
        };
    }
    displayHabits = (habits) => {
        console.log(habits);
        let formattedHabits = {};
        if (habits != {}) {
            // for (let habit of habits) {
            //     formattedHabits[habit._id] = (
            //         <Habit title={habit.title}/>
            //     );
            // }
            // this.setState({ habits: formattedHabits });
            changeHabits(habits);
            console.log(HabitComponents);
            this.setState({habits: HabitComponents});
        }

        
    }

    setup = (lastDateOpenedDoc) => {
        console.log("setup");
        console.log(this.state.habits);
        if (lastDateOpenedDoc.length > 0) {
            let lastDate = lastDateOpenedDoc[0]["lastDateOpened"];
            lastDate = new Date(2020, 4, 31);
            // TODO move to home screen
            const numMillisecondsInDay = 24 * 60 * 60 * 1000;
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0, 0);
            const daysPast =
                (currentDate.getTime() - lastDate.getTime()) /
                numMillisecondsInDay;

            if (daysPast === 1) {
                for (let habitKey of Object.keys(this.state.habits)) {
                    if (this.state.habits[habitKey]["props"]["completed"]) {
                        updateHabit(
                            this.state.habits[habitKey]["props"]["id"],
                            {},
                            { completedDays: currentDate }
                        );
                    } else {
                        updateHabit(
                            this.state.habits[habitKey]["props"]["id"],
                            {  },
                            { skippedDays: currentDate }
                        );
                    }
                }
                

                // TODO add update to stats
            }
        } else {
            console.log("Nothing exists, first start");
            destroyEverything();
            addLastDateOpenedDoc();
            addDatesDoc();
            addDate("perfect", new Date(2020, 4, 30));
            addDate("perfect", new Date(2020, 4, 31));
            addDate("perfect", new Date(2020, 5, 1));

            addDate("partial", new Date(2020, 5, 2));
            addDate("partial", new Date(2020, 5, 3));
            addDate("partial", new Date(2020, 5, 4));

            addDate("skipped", new Date(2020, 5, 5));
            addDate("skipped", new Date(2020, 5, 6));
            addDate("skipped", new Date(2020, 5, 7));
        }
    };
    startupCheck = () => {
        console.log("startup check");
        getLastDateOpened(this.setup);
    };

    componentDidMount = () => {
        this.startupCheck();
        getHabits(this.displayHabits);
        const update = this.props.navigation.addListener('focus', () => {
            this.forceUpdate()
          });
    }
    useEffect = () => {
        console.log("useeffect")
    }

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h4>
                        Today
                    </Text>

                    <Week />
                    {Object.values(HabitComponents)}

                    {/* <Habit></Habit> */}

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
                                            placeholder="e.g. Maintain a healthy lifestyle"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    newHabitTitle: text,
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
                                                this.setState({
                                                    habits: {
                                                        ...this.state.habits,
                                                        [this.state
                                                            .newHabitTitle]: (
                                                            <Habit
                                                                name={
                                                                    this.state
                                                                        .newHabitTitle
                                                                }
                                                            />
                                                        ),
                                                    },
                                                });
                                                this.setState({
                                                    modalVisible: false,
                                                });
                                            }}
                                        >
                                            <Text>Add Habit</Text>
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
