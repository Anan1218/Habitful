import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";
import LongTermGoal from "../classes/LongTermGoal";

export default class LongTermScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "", modalVisible: false };
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <Text style={styles.headerText} h4>
            Goals
          </Text>
          <LongTermGoal title={"Maintain a healthy life"} habits={2} TDs={0} />
          <LongTermGoal title={"Startup"} habits={0} TDs={5} />
          <LongTermGoal
            title={"Read and become knowledgable"}
            habits={2}
            TDs={1}
          />
          <View style={[Grid.row, Grid.justifyCenter]}>
            <Button
              onlyIcon
              icon="plus"
              iconFamily="antdesign"
              iconSize={30}
              color="warning"
              iconColor="#fff"
              style={{ width: 40, height: 40 }}
            >
              warning
            </Button>
          </View>

          
          
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  headerText: {
    margin: 10
  }
});
