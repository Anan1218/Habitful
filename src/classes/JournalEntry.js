import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import "react-native-gesture-handler";
import Grid from "../styles/Grid";
import { Input, Block, Text, Button } from "galio-framework";


export default class JournalEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "" };
  }
  render() {
    return (
      <View style={Grid.root}>
        <View style={Grid.col}>
          <View style={[Grid.row, Grid.justifyStart]}>
            <Button
              onlyIcon
              icon="check"
              iconFamily="antdesign"
              iconSize={20}
              color="success"
              iconColor="#fff"
              style={{ width: 30, height: 30, margin: 10 }}
              onPress={e => console.log(this.state.title)}
            >
              warning
            </Button>
            <Input placeholder="Title" onChangeText={title => this.setState({ title })} rounded />
          </View>
         
          <View style={[Grid.row, Grid.justifyStart]}>
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
  textInput: { height: 100, borderColor: "gray", textAlignVertical: "top", margin: 20 }
});
