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
import {
  addGoal,
  getGoals,
  removeGoal,
  deleteAllGoals,
  updateGoal
} from "../dbFunctions/GoalFunctions.js";
import {
  addHabit,
  getHabits,
  removeHabit,
  deleteAllHabits,
  updateHabit
} from "../dbFunctions/HabitFunctions.js";
import {
  addDatesDoc,
  addLastDateOpenedDoc,
  destroyEverything,
  getLastDateOpened,
  addDate
} from "../dbFunctions/StatsFunctions";

import HabitManager  from "../classes/HabitManager";

export default class HabitManagerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      newHabitTitle: "",
      newHabitDescription: "default description",
      habitList: {}
    };
  }
  saveNewHabit = (title, description) => {
    addHabit(title, description);
  }
  deleteHabit = (habitID) => {
    removeHabit(habitID);
    let newHabitList = this.state.habitList;
    delete newHabitList[habitID];
    this.setState({ habitList: newHabitList });
  }
  displayHabits = (habits) => {
    console.log(habits);
    let formattedHabits = {};
    if (habits != {}) {
      for (const habit of habits) {
        formattedHabits[habit._id] = (
          <HabitManager
            id={habit._id}
            deleteHabit={this.deleteHabit}
            editHabit={this.editHabit}
            title={habit.title}
            key={habit.title}
            description={habit.description}
            navigation={this.props.navigation}
            
          />
        );
      }
      this.setState({ habitList: formattedHabits });
    }
  }
  setup = lastDateOpenedDoc => {
    console.log("setup");
    console.log(this.state.habitList);
    if (lastDateOpenedDoc.length > 0) {
      let lastDate = lastDateOpenedDoc[0]["lastDateOpened"];
      lastDate = new Date(2020, 4, 31);
      // TODO move to home screen
      const numMillisecondsInDay = 24 * 60 * 60 * 1000;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0, 0);
      const daysPast =
        (currentDate.getTime() - lastDate.getTime()) / numMillisecondsInDay;
      
      if (daysPast === 1) {
        for (let habitKey of Object.keys(this.state.habits)) {
          if (this.state.habitList[habitKey]["props"]["completed"]) {
            updateHabit(this.state.habitList[habitKey]["props"]["id"], {}, { completedDays: currentDate });
          } else {
            updateHabit(this.state.habitList[habitKey]["props"]["id"], {}, { skippedDays: currentDate });
          }
        }
        getHabits(this.displayHabits);
        
        // TODO add update to stats?
      }
    } else {
      console.log("Nothing exists, first start");
      destroyEverything();
      addLastDateOpenedDoc();
      addDatesDoc();
      addDate("perfect", new Date(2020, 4, 30));
      addDate("perfect", new Date(2020, 4, 31));
      addDate("perfect", new Date(2020, 5, 1));

      addDate("partial", new Date(2020, 5, 2));
      addDate("partial", new Date(2020, 5, 3));
      addDate("partial", new Date(2020, 5, 4));

      addDate("skipped", new Date(2020, 5, 5));
      addDate("skipped", new Date(2020, 5, 6));
      addDate("skipped", new Date(2020, 5, 7));
    }
  };
  startupCheck = () => {
    console.log("startup check");
    getLastDateOpened(this.setup);
  };

  componentDidMount = () => {
    this.startupCheck();
    getHabits(this.displayHabits)
  }
  

  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            Habits
          </Text>

          {Object.values(this.state.habitList)}
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
                      placeholder="e.g. Run"
                      onChangeText={text =>
                        this.setState({ newHabitTitle: text })
                      }
                    />
                    <Input
                      placeholder="e.g. Jog for 30 minutes around block"
                      onChangeText={text =>
                        this.setState({ newHabitDescription: text })
                      }
                    />
                  </View>
                  <View style={[Grid.row, Grid.justifyCenter]}>
                    <Button
                      size="small"
                      onPress={() => {
                        this.saveNewHabit(this.state.newHabitTitle, this.state.newHabitDescription);
                        getHabits(this.displayHabits);
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
