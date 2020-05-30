import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";
import { addGoal, getGoals, removeGoal, deleteAllGoals } from "../dbFunctions/GoalFunctions.js";
import { addHabit, getHabits, removeHabit, deletAllHabits } from "../dbFunctions/HabitFunctions.js";

export default class LongTermScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalVisible: false,
      newGoalTitle: "",
      goalList: {}
    };

  }
  saveNewGoal = (title) => {
    addGoal(title);
  }

  deleteGoal = (id) => {
    removeGoal(id);
    let newGoalList = this.state.goalList;
    delete newGoalList[id];
    this.setState({goalList: newGoalList});
  }
  
  displayGoals = (goals) => {
    console.log(goals);
    let formattedGoals = {};
    if (goals != {}) {
      for(const goal of goals) {
        formattedGoals[goal._id] = <LongTermGoal id = {goal._id} deleteGoal = {this.deleteGoal} title={goal.title} key={goal.title} habits={goal.habitCount} TDs={goal.toDoCount} />;
      }
      this.setState({goalList: formattedGoals});
    } 
    // console.log(this.state.goalList)
    
  }

  displayHabits = (habits) => {
    console.log(habits);
  }
  componentDidMount =  async () => {
    getGoals(this.displayGoals);
    // addHabit("Habit1", "description1", "goal1");
    // addHabit("Habit2", "description2", "goal2");
    // addHabit("Habit3", "description3", "goal3");
    removeHabit("uSS7HSqfcOzZxGw4")
    getHabits(this.displayHabits);

  }

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            Goals
          </Text>

          {Object.values(this.state.goalList)}
          <View style={[Grid.row, Grid.justifyCenter]}>
            <Button
              onlyIcon
              icon="plus"
              iconFamily="antdesign"
              iconSize={30}
              color="warning"
              iconColor="#fff"
              style={{ width: 40, height: 40 }}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            >
              warning
            </Button>
          </View>
          

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
                  <View
                    style={[Grid.col, Grid.justifyCenter, Grid.alignStretch]}
                  >
                    <Input
                      placeholder="e.g. Maintain a healthy lifestyle"
                      onChangeText={text =>
                        this.setState({ newGoalTitle: text })
                      }
                    />
                  </View>
                  <View style={[Grid.row, Grid.justifyCenter]}>
                    <Button
                      size="small"
                      onPress={() => {
                        this.setState({
                          goalList: {
                            ...this.state.goalList,
                            [this.state.newGoalTitle]: <LongTermGoal
                              deleteGoal = {this.deleteGoal}
                              title={this.state.newGoalTitle}
                              habits={0}
                              TDs={0}
                              key={this.state.newGoalTitle}
                            />
                          }
                        });
                        this.saveNewGoal(this.state.newGoalTitle)
                        this.setState({ modalVisible: false });
                      }}
                    >
                      <Text>Add goal</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  headerText: {
    margin: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
