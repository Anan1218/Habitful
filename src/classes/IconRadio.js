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
  Picker
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { AntDesign } from "@expo/vector-icons";
import { Input, Text, Button, Icon, Radio } from "galio-framework";

export default class IconRadio extends React.Component {
  constructor(props) {
    super(props);
    let styleTemp = styles.inactive;
    if (this.props.active) {
      styleTemp = styles.active;
    }
    this.state = { active: this.props.active, style: styleTemp };
  }
  render() {
    return (
      <View style={[Grid.row, styles.icon]}>
        <TouchableHighlight
          style={this.state.style}
          onPress={() => {
            console.log(this.state.active);
            if (this.state.active) {
            //   this.setState({ active: false, style: styles.inactive });
            } else {
              this.props.changeCurrentIcon(this.props.iconName, () => {
                this.setState({ active: false, style: styles.inactive });
                console.log("changing icon");
              });
              this.setState({ active: true, style: styles.active });
            }
          }}
        >
          <AntDesign
            name={this.props.iconName}
            color={this.props.color}
            size={45}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  icon: {
    margin: 7,
    marginTop: 2
  },
  inactive: {},
  active: { backgroundColor: "red" }
});
