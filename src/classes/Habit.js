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
import { updateHabit, getHabits } from "../dbFunctions/HabitFunctions";
import {changeHabits, simpleUpdate} from "../state/Habits";
export class Habit extends Component {
    state = {
        name: "",
        active: false,
    };

    componentDidMount() {
        this.setState({ active: this.props.completed });
        getHabits(simpleUpdate)
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
                        getHabits(simpleUpdate);
                        
                    }}
                >
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.description}</Text>
                </Swipeable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    active: {
        width: "95%",
        backgroundColor: "orange",
        height: 50,
        margin: "2.5%",
        borderRadius: 5,
        opacity: 1,
    },

    inactive: {
        width: "95%",
        backgroundColor: "rgba(52,52,52, 0.3)",
        height: 50,
        margin: "2.5%",
        borderRadius: 5,
    },
});

const leftContent = [<Text>Content</Text>];

export default Habit;

let buttonStyle = StyleSheet.create({
    buttonStyles: {
        backgroundColor: "black",
    },
});
