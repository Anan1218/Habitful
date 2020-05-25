import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";
import { Input, Block, Text, Button } from "galio-framework";

export class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            date: "",
        };
    }

    render() {
        return (
            <Button
                shadowless
                style={this.state.active ? styles.btn : styles.btnActive}
                onPress={() => this.setState({ active: !this.state.active })}
            >
                <Text>T</Text>
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        backgroundColor: "red",
    },

    btnActive: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
});

export default Node;
