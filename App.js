import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LongTermScreen from "./src/screens/LongTermScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/StatsScreen";
import HabitStatsScreen from "./src/screens/HabitStatsScreen";
import { Icon, Button } from "galio-framework";
import HabitManagerScreen from "./src/screens/HabitManagerScreen";
const Tab = createBottomTabNavigator();
const HabitStack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen2({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen2} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}
function HabitManagerStackScreen() {
  return (
    <HabitStack.Navigator initialRouteName="HomeScreen">
      <HabitStack.Screen
        name="HabitManagerScreen"
        component={HabitManagerScreen}
      />
      <HabitStack.Screen name="HabitStatsScreen" component={HabitStatsScreen} />
      <HabitStack.Screen name="HomeScreen" component={HomeScreen2} />
    </HabitStack.Navigator>
  );
}
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
        <Tab.Screen name="Home2" component={HomeStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
