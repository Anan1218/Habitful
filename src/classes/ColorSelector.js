import React from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    StatusBar,
    ScrollView,
    Picker,
    FlatList,
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { AntDesign } from "@expo/vector-icons";
import { Input, Text, Button, Icon, Radio } from "galio-framework";
import IconRadio from "./IconRadio";

export default class IconSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circleColor: "red",
        };
    }

    render() {
        let colors = [
            "#F96261",
            "#F8C51A",
            "#2298D3",
            "#BFE34E",
            "#D589DC",
            "#F96261",
            "#26BBA6",
            "#6983BA",
            "#26AD5F",
            "#E84C3B",
            "#436193",
            "#FF8000",
            "#6FCFBA",
            "#49D1E1",
            "#B67941",
            "#E34A9C",
        ];

        let list = [];
        let key = 0;
        for (let circleColor of colors) {
            list.push({ circleColor, key: key.toString() });
            key += 1;
        }
        // console.log(iconList);
        return (
            <FlatList
                style={{}}
                scrollEnabled={"false"}
                numColumns={8}
                data={list}
                renderItem={({ item }) => (
                    <Button
                        style={{
                            backgroundColor: item.circleColor,
                            borderRadius: 50,
                            height: 25,
                            width: 25,
                            padding: 3,
                            margin: 5,
                        }}
                        shadowless={"true"}
                        onPress={() => {
                            this.props.colorChange(item.circleColor);
                        }}
                    ></Button>
                )}
            />
        );
    }
}
