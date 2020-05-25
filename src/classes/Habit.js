import React, { Component } from "react";
import { Input, Block, Text, Button } from "galio-framework";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";

import Node from "./Node";

export class Habit extends Component {
    state = {
        name: "",
        days: [],
    };

    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            this.state.days.push([]);
        }
        this.setState(this.state.days);
    }
    render() {
        const { days } = this.state;
        console.log(days);

        return (
            <View>
                <Text>Wash the Dishes</Text>
                <View style={styles.container}>
                    {days.map((e) => {
                        return (
                            <View style={styles.node}>
                                <Node></Node>
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    node: {
        backgroundColor: "grey",
        width: "10%",
        height: 40,
        borderWidth: 0.2,
    },

    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default Habit;
