import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";
import {
    addGoal,
    getGoals,
    removeGoal,
    deleteAllGoals,
    updateGoal,
} from "../dbFunctions/GoalFunctions.js";
import {
    addHabit,
    getHabits,
    removeHabit,
    deleteAllHabits,
    updateHabit,
} from "../dbFunctions/HabitFunctions.js";
import {
    addDatesDoc,
    addLastDateOpenedDoc,
    destroyEverything,
    getLastDateOpened,
    addDate,
} from "../dbFunctions/StatsFunctions";
import { Week } from "../classes/Week";
export default class LongTermScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            newGoalTitle: "",
            goalList: {},
            habits: {},
        };
    }
    saveNewGoal = (title) => {
        addGoal(title);
    };

    deleteGoal = (id) => {
        removeGoal(id);
        let newGoalList = this.state.goalList;
        delete newGoalList[id];
        this.setState({ goalList: newGoalList });
    };

    displayGoals = (goals) => {
        let formattedGoals = {};
        if (goals != {}) {
            for (const goal of goals) {
                formattedGoals[goal._id] = (
                    <LongTermGoal
                        id={goal._id}
                        deleteGoal={this.deleteGoal}
                        title={goal.title}
                        key={goal.title}
                        habits={goal.habitCount}
                        TDs={goal.toDoCount}
                    />
                );
            }
            this.setState({ goalList: formattedGoals });
        }
        // console.log(this.state.goalList)
    };

    displayHabits = (habits) => {
        console.log(habits);
    };
    componentDidMount = async () => {
        deleteAllHabits();
        let newHabitList = {};
        const testHabits = [
            {
                goalID: 123,
                title: "habit1",
                description: "habit1",
            },
            {
                goalID: 123,
                title: "habit2",
                description: "habit2",
            },
            {
                goalID: 123,
                title: "habit3",
                description: "habit3",
            },
        ];
        for (let habit of testHabits) {
            addHabit(habit.title, habit.description, habit.goalID);
        }
        getGoals(this.displayGoals);
        getHabits(this.displayHabits);
        this.startupCheck();
    };

    displayHabits = (habits) => {
        // console.log(habits);
        let newHabitList = {};
        for (let habit of habits) {
            newHabitList[habit["title"]] = (
                <Week
                    name={habit["title"]}
                    completed={habit["completed"]}
                    description={habit["description"]}
                    goalID={habit["goal"]}
                    id={habit["_id"]}
                />
            );
        }
        this.setState({ habits: newHabitList });
        // console.log(this.state.habits);
        // console.log(this.state.habits);
    };

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
                            { title: "not completed" },
                            { skippedDays: currentDate }
                        );
                    }
                }
                getHabits(this.displayHabits);

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

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h4>
                        Habits
                    </Text>

                    {Object.values(this.state.goalList)}
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
                                                    newGoalTitle: text,
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
                                                this.saveNewGoal(
                                                    this.state.newGoalTitle
                                                );
                                                getGoals(this.displayGoals);
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
