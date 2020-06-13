import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/StatsScreen";
import HabitManagerStackScreen  from "./src/navigators/HabitManagerStackScreen";
import { Icon, Button } from "galio-framework";

import HabitManagerScreen from "./src/screens/HabitManagerScreen";
import HabitStatsScreen from "./src/screens/HabitStatsScreen";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "orange",
          inactiveTintColor: "gray"
        }}
      >
        <Tab.Screen
          // options={{
          //   tabBarIcon: (focused, color, size) => {
          //     return (<Button
          //       onlyIcon
          //       icon="edit"
          //       iconFamily="antdesign"
          //       // iconSize={20}
          //       // color="warning"

          //       title={""}
          //     ></Button>);
          //   }
          // }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen name="Habits" component={HabitManagerStackScreen} />
        
        <Tab.Screen name="Statistics" component={StatsScreen} />
        {/* <Tab.Screen name="Home2" component={HomeStackScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
