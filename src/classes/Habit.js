import React, { Component } from "react";
import { Input, Block, Text, Button } from "galio-framework";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    InputAccessoryView,
} from "react-native";
import Grid from "../styles/Grid";
import Swipeable from "react-native-swipeable";
import { updateHabit } from "../dbFunctions/HabitFunctions";

export class Habit extends Component {
    state = {
        name: "",
        active: false,
    };

    componentDidMount() {
        this.setState({ active: this.props.completed });
    }

    render() {
        return (
            <View>
                <Swipeable
                    style={this.state.active ? styles.active : styles.inactive}
                    leftContent={leftContent}
                    leftActionActivationDistance={100}
                    onLeftActionRelease={() => {
                        this.setState({ active: !this.state.active });
                        updateHabit(
                            this.props.id,
                            { completed: !this.state.active },
                            {}
                        );
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.column1}>
                            <Button
                                onlyIcon
                                icon="heartbeat"
                                iconFamily="antdesign"
                                iconSize={30}
                                iconColor="black"
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    backgroundColor: "transparent",
                                    alignSelf: "center",
                                    alignContent: "center",
                                }}
                            ></Button>
                        </View>
                        <View style={styles.column2}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                    </View>
                </Swipeable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    active: {
        width: "95%",
        backgroundColor: "orange",
        height: 65,
        margin: "2.5%",
        borderRadius: 5,
        opacity: 1,
    },

    inactive: {
        width: "95%",
        backgroundColor: "rgba(52,52,52, 0.3)",
        height: 65,
        margin: "2.5%",
        borderRadius: 5,
    },

    title: {
        paddingLeft: 0,
        fontSize: 20,
    },

    description: {
        paddingLeft: 0,
    },

    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center", // if you want to fill rows left to right
        alignContent: "center",
        margin: "-2.5%",
    },

    column1: {
        width: "20%",
        paddingLeft: 0,
    },

    column2: {
        width: "80%",
        marginLeft: "-2.5%",
    },
});

const leftContent = [<Text>Content</Text>];

export default Habit;

let buttonStyle = StyleSheet.create({
    buttonStyles: {
        backgroundColor: "black",
    },
});
