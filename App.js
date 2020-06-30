import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/StatsScreen";
import HabitManagerStackScreen from "./src/navigators/HabitManagerStackScreen";
import { Icon, Button } from "galio-framework";

import HabitManagerScreen from "./src/screens/HabitManagerScreen";
import HabitStatsScreen from "./src/screens/HabitStatsScreen";

import {
    getLastDateOpened,
  } from "./src/dbFunctions/StatsFunctions";
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Today"
                tabBarOptions={{
                    activeTintColor: "orange",
                    inactiveTintColor: "gray",
                }}
            >
                <Tab.Screen
                    name="Today"
                    component={HomeScreen}
                />
                <Tab.Screen name="Habits" component={HabitManagerStackScreen} />

                <Tab.Screen name="Stats" component={StatsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
