import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LongTermScreen from "./src/screens/LongTermScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Tab = createBottomTabNavigator();
function JournalScreen() {
  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          margin: 50
        }}
      >
        <Text>Previous journals go here</Text>
      </View>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Goals" component={LongTermScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
