import React from "react";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";

import { Icon, Block, Text, Button, Input } from "galio-framework";
import { removeGoal, updateGoal } from "../dbFunctions/GoalFunctions";
export default class LongTermGoal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            title: this.props.title,
            newGoalTitle: this.props.title,
        };
    }

    render() {
        return (
            // <Block card={true} style={styles.card}>

            <View style={[Grid.col, styles.LongTermGoal]}>
                <View style={Grid.row}>
                    <View style={Grid.col}>
                        <View style={[Grid.row, styles.headingText]}>
                            <Text p>{this.state.title}</Text>
                        </View>
                        <View style={Grid.row}>
                            <View style={[Grid.row, styles.infoText]}>
                                <Text muted>
                                    {this.props.habits} running habits
                                </Text>
                            </View>
                            <View style={[Grid.row, styles.infoText]}>
                                <Text muted>
                                    {this.props.TDs} To-Dos completed
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[Grid.col]}>
                        <Button
                            onlyIcon
                            icon="edit"
                            iconFamily="antdesign"
                            iconSize={20}
                            color="warning"
                            iconColor="#fff"
                            style={{ width: 35, height: 35 }}
                            onPress={() => {
                                this.setState({ modalVisible: true });
                            }}
                        ></Button>
                    </View>
                </View>

                {/*
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
                            style={[Grid.row, Grid.justifyCenter, { flex: 1 }]}
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
                                    <Button
                                        onlyIcon
                                        icon="delete"
                                        iconFamily="antdesign"
                                        iconSize={20}
                                        color="red"
                                        iconColor="#fff"
                                        style={{ width: 35, height: 35 }}
                                        onPress={() => {
                                            this.props.deleteGoal(
                                                this.props.id
                                            );
                                        }}
                                    ></Button>
                                    <Input
                                        placeholder="e.g. Maintain a healthy lifestyle"
                                        onChangeText={(text) =>
                                            this.setState({
                                                newGoalTitle: text,
                                            })
                                        }
                                        value={this.state.newGoalTitle}
                                    />
                                </View>
                                <View style={[Grid.row, Grid.justifyCenter]}>
                                    <Button
                                        size="small"
                                        onPress={() => {
                                            updateGoal(
                                                this.state.title,
                                                this.state.newGoalTitle
                                            );
                                            this.setState({
                                                title: this.state.newGoalTitle,
                                            });
                                            this.setState({
                                                modalVisible: false,
                                            });
                                        }}
                                    >
                                        <Text>Change title</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                                      */}
            </View>

            // </Block>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        margin: 7,
        backgroundColor: "black",
    },
    LongTermGoal: {
        margin: 10,
    },
    headingText: {
        paddingRight: 19,
        paddingLeft: 14,
    },
    infoText: {
        paddingRight: 19,
        paddingLeft: 14,
    },
});
