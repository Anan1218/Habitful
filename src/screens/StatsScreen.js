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
import { Calendar } from "react-native-calendars";
import {
    getLastDateOpened,
    setLastDateOpened,
    addLastDateOpenedDoc,
    getDates,
    addDate,
    addDatesDoc,
} from "../dbFunctions/StatsFunctions";
import formatDateString from "../dateFunctions/formatDateString";
import calculateLongestStreak from "../dateFunctions/calculateLongestStreak";
import createMarkedDates from "../dateFunctions/createMarkedDates";

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

    displayDates = (datesDocs) => {
        // console.log(datesDocs);
        if (datesDocs == []) {
            return;
        }
        let newMarkedDates = this.state.markedDates;
        let formattedDateString;
        if (datesDocs[0]["perfectDays"].length > 0) {
            let streak = calculateLongestStreak(datesDocs[0]["perfectDays"]);
            this.setState({ streak: streak });
        }
        if (datesDocs[0]["perfectDays"].length > 0) {
            newMarkedDates = createMarkedDates(
                "perfectDays",
                datesDocs,
                newMarkedDates,
                "#4ee44e"
            );
        }
        if (datesDocs[0]["partialDays"].length > 0) {
            newMarkedDates = createMarkedDates(
                "partialDays",
                datesDocs,
                newMarkedDates,
                "#4e99e4"
            );
        }

        if (datesDocs[0]["skippedDays"].length > 0) {
            newMarkedDates = createMarkedDates(
                "skippedDays",
                datesDocs,
                newMarkedDates,
                "#e44e4e"
            );
        }

        this.setState({ markedDates: newMarkedDates });
        this.setState({
            perfectCount: datesDocs[0]["perfectDays"].length,
            partialCount: datesDocs[0]["partialDays"].length,
            skippedCount: datesDocs[0]["skippedDays"].length,
        });
    };

    componentDidMount = () => {
        getDates(this.displayDates);
    };

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h5>
                        Statistics
                    </Text>

                    <View style={[Grid.col, Grid.alignCenter]}>
                        <Text style={[styles.headerText, styles.lStreak]} h5>
                            {"Longest Streak:" + this.state.streak}
                        </Text>
                        <Text style={[styles.headerText, styles.perfect]} h5>
                            {"Perfect Days: " + this.state.perfectCount}
                        </Text>
                        <Text style={[styles.headerText, styles.partial]} h5>
                            {"Partial Days: " + this.state.partialCount}
                        </Text>
                        <Text style={[styles.headerText, styles.skipped]} h5>
                            {"Skipped Days: " + this.state.skippedCount}
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
                        markedDates={this.state.markedDates}
                        // // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                        markingType={"period"}
                    />
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
        paddingTop: 20,
    },
    lStreak: {
        color: "#4e4ee4",
    },
    perfect: {
        color: "#4ee44e",
    },
    partial: {
        color: "#4e99e4",
    },
    skipped: {
        color: "#e44e4e",
    },
});
