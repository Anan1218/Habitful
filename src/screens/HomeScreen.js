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

                    <Habit name="Sample Habit" />
                    {Object.values(this.state.habits)}

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
