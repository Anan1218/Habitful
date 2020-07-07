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
} from "../dbFunctions/HabitFunctions.js";
import {
    addDatesDoc,
    addLastDateOpenedDoc,
    destroyEverything,
    getLastDateOpened,
    addDate,
} from "../dbFunctions/StatsFunctions";

import HabitManager from "../classes/HabitManager";
import { changeHabits, HabitManagers, simpleUpdate } from "../state/Habits";

export default class HabitManagerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            newHabitTitle: "A new habit",
            newHabitDescription: "default description",
            habitList: {},
        };
    }

    deleteHabit = (habitID) => {
        removeHabit(habitID);
        getHabits(this.displayHabits, false);
    };
    navigate = (habitID, title, description) => {
        this.props.navigation.navigate("HabitStatsScreen", {
            habitID: habitID,
            title: title,
            description: description,
        });
    };
    displayHabits = (habits) => {
        let formattedHabits = {};
        console.log("habitmanagerscreen display habits");

        if (habits != {}) {
            console.log("chanign habits");
            changeHabits(habits, this.deleteHabit, this.navigate);
            this.setState({ habitList: HabitManagers });
        }
    };
    saveNewHabit = (title, description) => {
        addHabit(title, description);
        console.log("HMS saveNewHabit");
        getHabits(this.displayHabits, false);
    };
    deleteHabit = (habitID) => {
        removeHabit(habitID);
        getHabits(this.displayHabits, false);
    };

    componentDidMount = () => {
        // this.startupCheck();
        getHabits(this.displayHabits, false);
        const update = this.props.navigation.addListener("focus", () => {
            getHabits(this.displayHabits, false);
            this.setState({ habitList: HabitManagers });
            this.forceUpdate();
        });
    };

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h5>
                        Habits
                    </Text>

                    {Object.values(this.state.habitList)}
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
