import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableNativeFeedback,
} from "react-native";
import "react-native-gesture-handler";
import LongTermPage from "./LongTermScreen";
import Grid from "../styles/Grid";

import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";

import Habit from "../classes/Habit";
import Node from "../classes/Node";

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

    render() {
        return (
            <View style={Grid.root}>
                <View style={Grid.col}>
                    <Text style={styles.headerText} h4>
                        Habits
                    </Text>

                    <Habit />
                    {Object.values(this.state.habits)}
                </View>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    headerText: {
        margin: 10,
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
