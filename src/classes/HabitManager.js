import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";

import { Icon, Block, Text, Button, Input } from "galio-framework";

import { updateHabit, getHabits } from "../dbFunctions/HabitFunctions";
import { changeHabits, HabitManagers } from "../state/Habits";

export default class HabitManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: this.props.title,
      description: this.props.description,
      newHabitTitle: this.props.title,
      newHabitDescription: this.props.description,
      id: this.props.id
    };
  }

  render() {
    return (
      // <Block card={true} style={styles.card}>

      <View style={[Grid.col, styles.LongTermGoal]}>
        <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
          onPress={() => {
            this.props.navigate(this.props.id, this.props.title, this.props.description);
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
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={[Grid.row, Grid.justifyCenter, { flex: 1 }]}>
              <View
                style={[
                  Grid.col,
                  Grid.justifyCenter,
                  styles.modalView,
                  Grid.alignStretch
                ]}
              >
                <View style={[Grid.col, Grid.justifyCenter, Grid.alignStretch]}>
                  <Button
                    onlyIcon
                    icon="delete"
                    iconFamily="antdesign"
                    iconSize={20}
                    color="red"
                    iconColor="#fff"
                    style={{ width: 35, height: 35 }}
                    onPress={() => {
                      this.props.deleteHabit(this.props.id);
                    }}
                  ></Button>
                  <Input
                    placeholder=""
                    onChangeText={text =>
                      this.setState({ newHabitTitle: text })
                    }
                    value={this.state.newHabitTitle}
                  />
                  <Input
                    placeholder=""
                    onChangeText={text =>
                      this.setState({ newHabitDescription: text })
                    }
                    value={this.state.newHabitDescription}
                  />
                </View>
                <View style={[Grid.row, Grid.justifyCenter]}>
                  <Button
                    size="small"
                    onPress={() => {
                      updateHabit(
                        this.props.id,
                        {
                          title: this.state.newHabitTitle,
                          description: this.state.newHabitDescription
                        },
                        {}
                      );
                      this.setState({
                        title: this.state.newHabitTitle,
                        description: this.state.newHabitDescription
                      });
                      getHabits(changeHabits);
                      this.setState({ modalVisible: false });
                    }}
                    
                  >
                    <Text>Change title</Text>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      // </Block>
    );
  }
}
const styles = StyleSheet.create({
  touchableHighlight: {
    padding: 10
  },
  infoColumn: {
    flexShrink: 3
  },
  editButton: {
    paddingLeft: 0,
    marginLeft: 0,
    flexShrink: 1
    // backgroundColor: "green"
  },
  LongTermGoal: {
    margin: 10
  },
  headingText: {
    paddingRight: 19,
    paddingLeft: 14
  },
  infoText: {
    marginRight: 0,
    paddingRight: 10,
    paddingLeft: 14
    // backgroundColor: "red",
  }
});
