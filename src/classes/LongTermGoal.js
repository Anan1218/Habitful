import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";

import { Icon, Block, Text, Button } from "galio-framework";
export default class LongTermGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }
  render() {
    const data = [
      {
        title: "First Chapter",
        content: "Lorem ipsum dolor sit amet",
        icon: {
          name: "keyboard-arrow-up",
          family: "material",
          size: 16
        }
      },
      { title: "2nd Chapter", content: "Lorem ipsum dolor sit amet" },
      { title: "3rd Chapter", content: "Lorem ipsum dolor sit amet" }
    ];
    return (
      <Block card={true} style={styles.card}>
        
          <View style={[Grid.col, styles.LongTermGoal]}>
            <View style={Grid.row}>
              <View style={Grid.col}>
                <Button
                  onlyIcon
                  icon="tags"
                  iconFamily="antdesign"
                  iconSize={30}
                  color="warning"
                  iconColor="#fff"
                  style={{ width: 40, height: 40 }}
                >
                  warning
                </Button>
              </View>
              <View style={Grid.col}>
                <View style={[Grid.row, styles.headingText]}>
                  <Text color={"white"} p>
                    {this.props.title}
                  </Text>
                </View>
                <View style={Grid.row}>
                  <View style={[Grid.row, styles.infoText]}>
                    <Text muted>{this.props.habits} running habits</Text>
                  </View>
                  <View style={[Grid.row, styles.infoText]}>
                    <Text muted>{this.props.TDs} To-Dos completed</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          

          {/* <Button
              size="small"
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            >
              <Text>Show Modal</Text>
            </Button> */}
        
        
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    margin: 7,
    backgroundColor: "black"
  },
  LongTermGoal: {
    margin: 10
  },
  headingText: {
    paddingLeft: 19
  },
  infoText: {
    paddingLeft: 19
  }
});
