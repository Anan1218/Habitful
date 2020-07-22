import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import { Calendar } from "react-native-calendars";
import formatDateString from "../dateFunctions/formatDateString";
import calculateLongestStreak from "../dateFunctions/calculateLongestStreak";
import createMarkedDates from "../dateFunctions/createMarkedDates";
import { Habits } from "../state/Habits";
import { getHabits } from "../dbFunctions/HabitFunctions";
import calcStats from "../dateFunctions/calcStats";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class StatsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markedDates: {},
            perfectCount: 0,
            partialCount: 0,
            skippedCount: 0,
            streak: 0,
        };
    }

    calcStats = (habitDocs) => {
        let stats = calcStats(habitDocs, this.state.markedDates);
        stats.markedDates[formatDateString(new Date())] = { color: "#ffa500" };
        this.setState({
            streak: stats.streak,
            markedDates: stats.markedDates,
            perfectCount: stats.perfectCount,
            skippedCount: stats.skippedCount,
            partialCount: stats.partialCount,
        });
    };

    componentDidMount = () => {
        getHabits(this.calcStats);
        const update = this.props.navigation.addListener("focus", () => {
            getHabits(this.calcStats);
            this.forceUpdate();
        });
    };

    render() {
        return (
            <View style={Grid.root}>
                <View style={[Grid.col, styles.page]}>
                    <Text style={styles.headerText} h5>
                        Statistics
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

                    <ScrollView style={styles.scrollView}>
                        <View style={{ width: "92.5%", alignSelf: "center" }}>
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
                                            {this.state.perfectCount}
                                        </Text>
                                        {/* <Text style={styles.days}>Days</Text> */}
                                    </View>

                                    <Text style={styles.description}>
                                        Perfect Days
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
                                        name="calendar"
                                        size={45}
                                        style={styles.icon}
                                    ></MaterialCommunityIcons>
                                    <View style={styles.info}>
                                        <Text style={styles.number}>
                                            {this.state.partialCount}
                                        </Text>
                                        {/* <Text style={styles.days}>Days</Text> */}
                                    </View>
                                    <Text style={styles.description}>
                                        Partial Days
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
        flex: 1
    },
    scrollView: {
        // marginBottom: 90,
    },
    headerText: {
        textAlign: "center",
        fontWeight: "500",
        paddingTop: 20,
    },
    lStreak: {
        color: "#4e4ee4",
    },

    questionButton: {
        width: 20,
        height: 20,
        position: "absolute",
        right: 12.5,
        top: 25,
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
