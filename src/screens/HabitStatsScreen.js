import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StatusBar,
    ScrollView
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";

import {
    addHabit,
    getHabits,
    removeHabit,
    deleteAllHabits,
    updateHabit,
    getHabit,
    addSkipped,
    addCompleted,
    removeCompleted,
    removeSkipped,
} from "../dbFunctions/HabitFunctions.js";

import { Calendar } from "react-native-calendars";

import formatDateString from "../dateFunctions/formatDateString";
import calculateLongestStreak from "../dateFunctions/calculateLongestStreak";
import createMarkedDates from "../dateFunctions/createMarkedDates";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class HabitStatsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markedDates: {},
            streak: 0,
            completedCount: 0,
            skippedCount: 0,
            completionPercent: 0,
            questionModalVisible: false,
        };
    }
    displayDates = (habitDoc) => {
        console.log(habitDoc);
        let newMarkedDates = {};
        let streak = calculateLongestStreak(habitDoc[0]["completedDays"]);
        this.setState({ streak: streak });
        console.log(streak);

        newMarkedDates = createMarkedDates(
            "completedDays",
            habitDoc,
            newMarkedDates,
            "#4ee44e"
        );
        newMarkedDates = createMarkedDates(
            "skippedDays",
            habitDoc,
            newMarkedDates,
            "#e44e4e"
        );
        newMarkedDates[formatDateString(new Date())] = { color: "#ffa500" };
        this.setState({ markedDates: newMarkedDates });
        this.setState({
            completedCount: habitDoc[0]["completedDays"].length,
            skippedCount: habitDoc[0]["skippedDays"].length,
        });
        console.log(habitDoc[0]["completedDays"]);
        console.log(habitDoc[0]["skippedDays"]);

        if (this.state.completedCount > 0 || this.state.skippedCount > 0) {
            this.setState({
                completionPercent: (
                    (100 * this.state.completedCount) /
                    (this.state.skippedCount + this.state.completedCount)
                ).toFixed(0),
            });
        }
    };
    componentDidMount = () => {
        getHabit(this.props.route.params.habitID, this.displayDates);
        const update = this.props.navigation.addListener("focus", () => {
            getHabit(this.props.route.params.habitID, this.displayDates);
            this.forceUpdate();
        });
    };

    updateDate = (isCompleted, previousDay, habitID) => {
        const numMillisecondsInDay = 24 * 60 * 60 * 1000;
        if (!isCompleted) {
            // The day object passed by  react-native-calendars is not a JS Date object. The timestamp actually represents the previous day
            // so you have to add numMillisecondsInDay so the timestamp represents the correct date
            let day = new Date(previousDay.timestamp + numMillisecondsInDay);
            day.setHours(0, 0, 0, 0, 0);
            // Enter: Callback Hell
            // Note: use async await next time
            removeSkipped(habitID, day, () => {
                addCompleted(habitID, [day], () => {
                    getHabit(
                        this.props.route.params.habitID,
                        this.displayDates
                    );
                });
            });
        } else {
            let day = new Date(previousDay.timestamp + numMillisecondsInDay);
            day.setHours(0, 0, 0, 0, 0);
            removeCompleted(habitID, day, () => {
                addSkipped(habitID, [day], () => {
                    getHabit(
                        this.props.route.params.habitID,
                        this.displayDates
                    );
                });
            });
        }
    };

    render() {
        return (
            <View style={Grid.root}>
                <View style={[Grid.col, styles.page]}>
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
                                    questionModalVisible: false,
                                });
                            }}
                        >
                            <View
                                style={[
                                    Grid.row,
                                    Grid.justifyCenter,
                                    { flex: 1 },
                                ]}
                            >
                                <Text>
                                    Tap on a date to check in/check out for the
                                    past date.
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <View>
                        <View style={styles.backButton}>
                            {Platform.OS !== "android" && (
                                <Button
                                    onlyIcon
                                    icon="left"
                                    iconFamily="antdesign"
                                    iconSize={30}
                                    color="transparent"
                                    iconColor="black"
                                    style={{ width: 40, height: 40 }}
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            "Habits",
                                            {
                                                screen: "HabitManagerScreen",
                                            }
                                        );
                                    }}
                                />
                            )}
                        </View>
                        <Text p style={styles.habitName}>
                            {this.props.route.params.title}
                        </Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
                    <View style={{ width: "92.5%", alignSelf: "center" }}>
                        <Calendar
                            onDayPress={(day) => {
                                console.log("selected day", day);
                                if (
                                    day.dateString !==
                                    formatDateString(new Date())
                                ) {
                                    let isCompleted;
                                    let formattedDay = day.dateString;
                                    // console.log(this.state.markedDates[formattedDay]);
                                    if (
                                        this.state.markedDates[formattedDay] !==
                                            undefined &&
                                        this.state.markedDates[formattedDay][
                                            "color"
                                        ] === "#4ee44e"
                                    ) {
                                        isCompleted = true;
                                    } else {
                                        isCompleted = false;
                                    }
                                    console.log(isCompleted);
                                    this.updateDate(
                                        isCompleted,
                                        day,
                                        this.props.route.params.habitID
                                    );
                                }

                                // this.props.navigation.navigate("PastHabitScreen", {
                                //   day: day,
                                //   habitID: this.props.route.params.habitID,
                                //   completed: isCompleted,
                                //   title: this.props.route.params.title,
                                //   description: this.props.route.params.description
                                // });
                            }}
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
                            maxDate={formatDateString(new Date())}
                        />
                    </View>

                    <View>
                        <Text
                            p
                            style={{
                                paddingLeft: "3.5%",
                                paddingBottom: 10,
                                paddingTop: 10,
                            }}
                        >
                            Overview
                        </Text>
                        <View style={styles.overviewContainer}>
                            <View style={styles.contentBox}>
                                <MaterialCommunityIcons
                                    name="crown"
                                    size={45}
                                    style={styles.icon}
                                ></MaterialCommunityIcons>
                                <View style={styles.info}>
                                    <Text style={styles.number}>
                                        {this.state.streak}
                                    </Text>
                                    {/* <Text style={styles.days}>Days</Text> */}
                                </View>

                                <Text style={styles.description}>
                                    Longest Streak
                                </Text>
                            </View>

                            <View style={styles.contentBox}>
                                <MaterialCommunityIcons
                                    name="check"
                                    size={45}
                                    style={styles.icon}
                                ></MaterialCommunityIcons>
                                <View style={styles.info}>
                                    <Text style={styles.number}>
                                        {this.state.completedCount}
                                    </Text>
                                    {/* <Text style={styles.days}>Days</Text> */}
                                </View>

                                <Text style={styles.description}>
                                    Completed Days
                                </Text>
                            </View>

                            <View style={styles.contentBox}>
                                <MaterialCommunityIcons
                                    name="skip-next"
                                    size={45}
                                    style={styles.icon}
                                ></MaterialCommunityIcons>
                                <View style={styles.info}>
                                    <Text style={styles.number}>
                                        {this.state.skippedCount}
                                    </Text>
                                    {/* <Text style={styles.days}>Days</Text> */}
                                </View>
                                <Text style={styles.description}>
                                    Skipped Days
                                </Text>
                            </View>

                            <View style={styles.contentBox}>
                                <MaterialCommunityIcons
                                    name="chart-pie"
                                    size={45}
                                    style={styles.icon}
                                ></MaterialCommunityIcons>
                                <View style={styles.info}>
                                    <Text style={styles.number}>
                                        {" "}{this.state.completionPercent}
                                    </Text>
                                    <Text style={styles.days}>%</Text>
                                </View>
                                <Text style={styles.description}>
                                    Completion Percent
                                </Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    page: {
        // height: 
        flex: 1
    },
    scrollView: {
        // marginBottom: 30,
        // height: 700
    },
    headerText: {
        margin: 10,
    },
    lStreak: {
        color: "#4e4ee4",
    },

    backButton: {
        left: -15,
        top: -2,
        padding: 20,
        paddingBottom: 0,
        marginBottom: 0,
    },

    questionButton: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 12.5,
        top: 25,
    },

    habitName: {
        position: "absolute",
        top: 23,
        left: 40,
    },
    overviewContainer: {
        alignSelf: "center",
        width: "95%",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    contentBox: {
        margin: "1%",
        width: "48%",
        backgroundColor: "rgba(26, 0, 0, 0.025)",
        height: 120,
        borderRadius: 5,
        alignItems: "center",
    },

    info: {
        flexDirection: "row",
        alignSelf: "center",
    },

    icon: {
        paddingTop: 10,
    },

    number: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },

    days: {
        top: 15,
        color: "rgba(26, 0, 0, 0.5)",
    },

    description: {
        textAlign: "center",
    },
});
