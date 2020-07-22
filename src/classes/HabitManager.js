import React from "react";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";

import { Icon, Block, Text, Button, Input } from "galio-framework";

import { updateHabit, getHabits } from "../dbFunctions/HabitFunctions";
import { changeHabits, HabitManagers, simpleUpdate } from "../state/Habits";
import DropDownPicker from "react-native-dropdown-picker";
import IconSelector from "../classes/IconSelector";
import { AntDesign } from "@expo/vector-icons";
import ColorSelector from "../classes/ColorSelector";

export default class HabitManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            title: this.props.title,
            description: this.props.description,
            newHabitTitle: this.props.title,
            newHabitDescription: this.props.description,
            id: this.props.id,
            iconColor: this.props.color,
            iconName: "back",
            changeFunction: "",
        };
    }
    componentDidMount = () => {
        // getHabits(simpleUpdate);
    };
    changeCurrentIcon = (iconName, changeFunction) => {
        this.setState({ iconName });
        if (this.state.changeFunction !== "") {
            this.state.changeFunction();
        }
        this.setState({ changeFunction });
    };
    colorChange = (newColor) => {
        this.setState({ iconColor: newColor });
    };
    render() {
        return (
            // <Block card={true} style={styles.card}>

            <View style={[Grid.col, styles.LongTermGoal]}>
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => {
                        this.props.navigate(
                            this.props.id,
                            this.props.title,
                            this.props.description
                        );
                    }}
                    style={[styles.touchableHighlight]}
                >
                    <View style={[Grid.row, Grid.justifyContentSpaceBetween]}>
                        <View style={[Grid.col, styles.infoColumn]}>
                            <View style={[Grid.row, styles.headingText]}>
                                <Text p>{this.state.title}</Text>
                            </View>
                            <View style={Grid.row}>
                                <View style={[Grid.row, styles.infoText]}>
                                    <Text muted>{this.state.description}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[Grid.col, styles.editButton]}>
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
                </TouchableHighlight>
                

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}
                >
                    <View style={[styles.modalView]}>
                        <View backgroundColor={this.state.iconColor}>
                            <Text
                                style={[styles.headerText, { paddingTop: 50 }]}
                                h5
                            >
                                Edit Habit
                            </Text>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false,
                                    });
                                }}
                                style={styles.closeModal}
                            >
                                <Text p style={styles.topButtons}>
                                    Cancel
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => {
                                    updateHabit(
                                        this.props.id,
                                        {
                                            title: this.state.newHabitTitle,
                                            description: this.state
                                                .newHabitDescription,
                                            iconName: this.state.iconName,
                                            color: this.state.iconColor,
                                        },
                                        {}
                                    );
                                    this.setState({
                                        title: this.state.newHabitTitle,
                                        description: this.state
                                            .newHabitDescription,
                                    });
                                    // probably a problem TODO fix
                                    getHabits(changeHabits, false);
                                    this.setState({ modalVisible: false });
                                }}
                                style={[styles.addHabitButton]}
                            >
                                <Text p style={styles.save}>
                                    Save
                                </Text>
                            </TouchableHighlight>

                           
                        </View>
                        <View style={styles.name}>
                                <Text>Name</Text>
                                <Input
                                    placeholder="e.g. Run"
                                    onChangeText={(text) =>
                                        this.setState({ newHabitTitle: text })
                                    }
                                    value={this.state.newHabitTitle}
                                />
                            </View>
                        <View style={styles.details}>
                            <Text>Description</Text>
                            <Input
                                placeholder="e.g. Jog for 30 minutes around block"
                                onChangeText={(text) =>
                                    this.setState({ newHabitDescription: text })
                                }
                                value={this.state.newHabitDescription}
                            />

                            <Text>Color</Text>
                            <ColorSelector
                                colorChange={this.colorChange}
                                style={styles.colorSelector}
                            />

                            <Text style={styles.icon}>Icon</Text>
                            <IconSelector
                                iconColor={"black"}
                                changeCurrentIcon={this.changeCurrentIcon}
                                style={styles.iconSelector}
                            />
                        </View>
                        <Button
                            onlyIcon
                            icon="delete"
                            iconFamily="antdesign"
                            iconSize={20}
                            color="red"
                            iconColor="#fff"
                            style={{ width: 35, height: 35, margin: 10 }}
                            onPress={() => {
                                this.props.deleteHabit(this.props.id);
                            }}
                        ></Button>
                    </View>
                </Modal>
            </View>

            // </Block>
        );
    }
}
const styles = StyleSheet.create({
    name: {
        padding: 10,
    },

    details: {
        padding: 10,
    },

    icon: {
        padding: 0,
    },
    modalView: {
        height: "100%",
        width: "100%",
        margin: 0,
        backgroundColor: "white",
        padding: 0,
        // alignItems: "center"
    },
    addHabitButton: {
        position: "absolute",
        right: "2%",
        top: 30,
        width: 70,
        height: 40,
        marginTop: 15,
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: "transparent",
    },

    closeModal: {
        position: "absolute",
        left: "2%",
        top: 30,
        width: 70,
        height: 40,
        marginTop: 15,
        backgroundColor: "transparent",
    },
    touchableHighlight: {
        padding: 10,
    },
    infoColumn: {
        flexShrink: 3,
    },
    editButton: {
        paddingLeft: 0,
        marginLeft: 0,
        flexShrink: 1,
        // backgroundColor: "green"
    },
    LongTermGoal: {
        margin: 10,
    },
    headingText: {
        paddingRight: 19,
        paddingLeft: 14,
    },
    infoText: {
        marginRight: 0,
        paddingRight: 10,
        paddingLeft: 14,
        // backgroundColor: "red",
    },

    headerText: {
        margin: 0,
        textAlign: "center",
        fontWeight: "500",
        paddingTop: 20,
        paddingBottom: 20,
    },

    modalView: {
        height: "100%",
        width: "100%",
        margin: 0,
        backgroundColor: "white",
        padding: 0,
        // alignItems: "center"
    },

    topButtons: {
        fontSize: 18,
    },

    save: {
        position: "absolute",
        right: 7,
        top: 8,
        fontSize: 18,
    },

    temp: {
        height: "100%",
    },

    name: {
        paddingTop: 30,
        paddingLeft: "4%",
        paddingRight: "4%",
    },

    details: {
        padding: 10,
    },

    icon: {
        padding: 0,
    },
});
