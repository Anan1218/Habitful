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

export class Habit extends Component {
    state = {
        name: "",
        active: false,
    };

    componentDidMount() {}

    render() {
        return (
            <View>
                <Swipeable
                    style={this.state.active ? styles.active : styles.inactive}
                    leftContent={leftContent}
                    rigthButtons={rigthButtons}
                    onLeftActionRelease={() =>
                        this.setState({ active: !this.state.active })
                    }
                >
                    <Text>Habit</Text>
                </Swipeable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    active: {
        backgroundColor: "red",
        height: 50,
        margin: "2.5%",
    },

    inactive: {
        backgroundColor: "grey",
        height: 50,
        margin: "2.5%",
    },
});

const leftContent = <Text>Pull to activate</Text>;

const rigthButtons = [
    <TouchableHighlight>
        <Text>Button 1</Text>
    </TouchableHighlight>,
];

export default Habit;
