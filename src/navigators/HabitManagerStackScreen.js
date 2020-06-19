import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { createSwitchNavigator } from "react-navigation";
import HabitManagerScreen from "../screens/HabitManagerScreen";
import HabitStatsScreen from "../screens/HabitStatsScreen";
import PastHabitScreen from "../screens/PastHabitScreen";
const HabitStack = createStackNavigator();

export default function HabitManagerStackScreen() {
  return (
    <HabitStack.Navigator
      headerMode="none"
      initialRouteName="HabitManagerScreen"
    >
      <HabitStack.Screen
        name="HabitManagerScreen"
        component={HabitManagerScreen}
      />
      <HabitStack.Screen name="HabitStatsScreen" component={HabitStatsScreen} />
      <HabitStack.Screen name="PastHabitScreen" component={PastHabitScreen} />
    </HabitStack.Navigator>
  );
}
