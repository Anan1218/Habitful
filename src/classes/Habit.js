import React, { Component } from "react";
import { Input, Block, Text, Button, Icon } from "galio-framework";
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
import { changeHabits, simpleUpdate } from "../state/Habits";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export class Habit extends Component {
    state = {
        name: "",
        active: false,
        icon: "checkbox-blank-circle-outline",
        containerColor: this.props.color,
    };

    componentDidMount() {
        this.setState({ active: this.props.completed });
        getHabits(simpleUpdate);
    }

    isComplete() {
        if (this.state.active) {
            this.setState({ icon: "checkbox-blank-circle-outline" });
        } else {
            this.setState({ icon: "checkbox-marked-circle" });
        }
    }

    render() {
        return (
            <View>
                <Swipeable
                    style={this.state.active ? styles.active : styles.inactive}
                    backgroundColor={
                        this.state.active
                            ? this.props.color
                            : "rgba(52,52,52, 0.2)"
                    }
                    leftContent={leftContent}
                    leftActionActivationDistance={100}
                    onLeftActionRelease={() => {
                        this.setState({ active: !this.state.active });
                        console.log(this.props.iconName);
                        console.log(this.props.color);
                        updateHabit(
                            this.props.id,
                            { completed: !this.state.active },
                            {}
                        );
                        getHabits(simpleUpdate);
                        this.isComplete();
                    }}
                >
                    {/* <View style={styles.container}>
            <View style={styles.column1}> */}
                    {/* <Button
                onlyIcon
                icon={this.props.iconName}
                iconFamily="antdesign"
                iconSize={30}
                iconColor={this.props.color}
                style={{
                  width: "50%",
                  height: "50%",
                  backgroundColor: "transparent",
                  alignSelf: "center",
                  alignContent: "center"
                }}
              ></Button> */}
                    {/* <AntDesign
                name={this.props.iconName}
                color={this.props.color}
                size={32}
              />
            </View>
            <View style={styles.column2}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View style={styles.column3}>
              <MaterialCommunityIcons
                name={this.state.icon}
                size={30}
              ></MaterialCommunityIcons>
            </View>
          </View> */}

                    <View style={[Grid.row, Grid.justifyContentSpaceBetween]}>
                        <View style={Grid.row}>
                            <AntDesign
                                name={this.props.iconName}
                                //color={this.props.color}
                                size={32}
                                style={{ margin: 10 }}
                            />
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                        <View style={Grid.row}>
                            <MaterialCommunityIcons
                                name={this.state.icon}
                                size={30}
                                style={{ margin: 10 }}
                            ></MaterialCommunityIcons>
                        </View>
                    </View>
                </Swipeable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    active: {
        // width: "95%",
        //backgroundColor: "#7838F2",
        height: 65,
        // margin: "2.5%",
        margin: 10,
        borderRadius: 5,
        opacity: 1,
        alignItems: "center",
    },

    inactive: {
        // width: "95%",
        backgroundColor: "rgba(52,52,52, 0.3)",
        height: 65,
        // margin: "2.5%",
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
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
        width: "70%",
        marginLeft: "-2.5%",
    },

    column3: {
        width: "10%",
    },
});

const leftContent = [<Text>Content</Text>];

export default Habit;

let buttonStyle = StyleSheet.create({
    buttonStyles: {
        backgroundColor: "black",
    },
});
