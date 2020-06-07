import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LongTermScreen from "./src/screens/LongTermScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StatsScreen from "./src/screens/StatsScreen";
import { Icon, Button } from "galio-framework";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    activeTintColor: "orange",
                    inactiveTintColor: "gray",
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
                <Tab.Screen name="Goals" component={LongTermScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
