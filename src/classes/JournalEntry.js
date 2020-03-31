import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";

export default class JournalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <View style={Grid.row}>
            <Button
              onlyIcon
              icon="check"
              iconFamily="antdesign"
              iconSize={20}
              color="success"
              iconColor="#fff"
              style={{ width: 30, height: 30 }}
            >
              warning
            </Button>
            <Button
              onlyIcon
              icon="check"
              iconFamily="antdesign"
              iconSize={20}
              color="success"
              iconColor="#fff"
              style={{ width: 30, height: 30 }}
            >
              warning
            </Button>
            <Button
              onlyIcon
              icon="check"
              iconFamily="antdesign"
              iconSize={20}
              color="success"
              iconColor="#fff"
              style={{ width: 30, height: 30 }}
            >
              warning
            </Button>
            <Button
              onlyIcon
              icon="check"
              iconFamily="antdesign"
              iconSize={20}
              color="success"
              iconColor="#fff"
              style={{ width: 30, height: 30 }}
            >
              warning
            </Button>
          </View>
          <View style={Grid.row}>
            <Input placeholder="Title" rounded style={{ flexGrow: 1 }} />
          </View>
          <View style={Grid.row}>
            <TextInput
              placeholder="Write about your day..."
              onChangeText={text => this.setState({ text })}
              style={styles.textInput}
              multiline={true}
              style={styles.textInput}
            />
          </View>
        </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
  textInput: { height: 100, borderColor: "gray", textAlignVertical: "top" }
});
