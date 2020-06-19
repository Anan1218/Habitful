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
    state = {
        active: false,
        date: this.props.date,
    };

    render() {
        return (
            <Button
                shadowless
                style={this.state.active ? styles.btn : styles.btnActive}
                onPress={() => this.setState({ active: !this.state.active })}
            >
                <Text>{this.state.date}</Text>
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        backgroundColor: "orange",
        borderRadius: 50,
        borderColor: "orange",
        borderWidth: 2,
    },

    btnActive: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 50,
        borderColor: "orange",
        borderWidth: 2,
    },
});

export default Node;
