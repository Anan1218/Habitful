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
import Grid from "../styles/Grid";

import Node from "./Node";

export class Habit extends Component {
    state = {
        name: this.props.name,
        nodes: [],
    };

    componentDidMount() {
        if (this.state.nodes.length == 0) {
            var today = new Date();
            today.setDate(today.getDate() - 9);

            for (let i = 0; i < 10; i++) {
                this.state.nodes.push([today.getDate() + i]);
            }
            this.setState(this.state.nodes);
        }
    }
    render() {
        const { nodes } = this.state;
        var temp = nodes.slice(nodes.length - 10);

        var lastTen = nodes.slice(nodes.length - 10).map((e, i) => {
            return (
                <View style={styles.node}>
                    <Node date={this.state.nodes[i]}></Node>
                </View>
            );
        });

        return (
            <View>
                <View style={[Grid.row, styles.headingText]}>
                    <Text p>{this.state.name}</Text>
                </View>
                <View style={styles.container}>{lastTen}</View>
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
