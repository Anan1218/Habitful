// ... screen imports
import { StatsScreen, HomeScreen } from "../screens";

import { Platform } from "react-native";
import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator,
} from "react-navigation";

const HomeStack = createStackNavigator({
    DetailScreen,
    HomeScreen,
    OptionsScreen,
});

const MainNavigator = Platform.select({
    ios: createBottomTabNavigator({ HomeStack, SettingsScreen }),
    android: createDrawerNavigator({ HomeStack, SettingsScreen }),
});

const RootSwitch = createSwitchNavigator(
    { LoadingScreen, MainNavigator },
    { initialRouteName: "MainNavigator" }
);
