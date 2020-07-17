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
  FlatList
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { AntDesign } from "@expo/vector-icons";
import { Input, Text, Button, Icon, Radio } from "galio-framework";
import IconRadio from "./IconRadio";

export default class IconSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderItem = ({ item }) => {
    return (<IconRadio
      changeCurrentIcon={this.props.changeCurrentIcon}
      active={false}
      iconName={item.iconName}
      color={this.props.iconColor}
    />);
  };

  render() {
    let iconNameList = ["back", "mail", "link", "areachart", "laptop", "star"];
    let iconList = [];
    let key = 0;
    for (let iconName of iconNameList) {
        iconList.push({iconName, key: key.toString()});
        key+=1;
    }
    console.log(iconList);
    return (
      <ScrollView horizontal={true} style={styles.iconScrollView}>
        {/* <View style={Grid.col}>
          <IconRadio
            changeCurrentIcon={this.props.changeCurrentIcon}
            active={false}
            iconName="back"
            color={this.props.iconColor}
          />
          <IconRadio
            changeCurrentIcon={this.props.changeCurrentIcon}
            active={false}
            iconName="back"
            color={this.props.iconColor}
          />
          <IconRadio
            changeCurrentIcon={this.props.changeCurrentIcon}
            active={false}
            iconName="back"
            color={this.props.iconColor}
          />
          <IconRadio
            changeCurrentIcon={this.props.changeCurrentIcon}
            active={false}
            iconName="back"
            color={this.props.iconColor}
          />
          <IconRadio
            changeCurrentIcon={this.props.changeCurrentIcon}
            active={false}
            iconName="back"
            color={this.props.iconColor}
          />
        </View> */}
        <FlatList numColumns={2} data={iconList} renderItem={this.renderItem} />
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  iconScrollView: {
    height: 500
  }
});
