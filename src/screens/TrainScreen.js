import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import "react-native-gesture-handler";
// const { NlpManager } = require('node-nlp');
// import NlpManager from "node-nlp-rn";
const { containerBootstrap } = require("@nlpjs/core");
const { Nlp } = require("@nlpjs/nlp");
const { LangEn } = require("@nlpjs/lang-en-min");

export default class TrainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", nlp: "" };
  }

  componentDidMount = async () => {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get("nlp");
    this.setState({ nlp });
    this.state.nlp.settings.autoSave = false;
    this.state.nlp.addLanguage("en");
    // Adds the utterances and intents for the NLP
    this.state.nlp.addDocument("en", "goodbye for now", "greetings.bye");
    this.state.nlp.addDocument("en", "bye bye take care", "greetings.bye");
    this.state.nlp.addDocument("en", "okay see you later", "greetings.bye");
    this.state.nlp.addDocument("en", "bye for now", "greetings.bye");
    this.state.nlp.addDocument("en", "i must go", "greetings.bye");
    this.state.nlp.addDocument("en", "hello", "greetings.hello");
    this.state.nlp.addDocument("en", "hi", "greetings.hello");
    this.state.nlp.addDocument("en", "howdy", "greetings.hello");

    // Train also the NLG
    this.state.nlp.addAnswer("en", "greetings.bye", "Till next time");
    this.state.nlp.addAnswer("en", "greetings.bye", "see you soon!");
    this.state.nlp.addAnswer("en", "greetings.hello", "Hey there!");
    this.state.nlp.addAnswer("en", "greetings.hello", "Greetings!");
    await this.state.nlp.train();
  };
  findIntent = async event => {
    const response = await this.state.nlp.process("en", this.state.text);
    console.log(response);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>What makes you happy?</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type full sentences here."
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="Find intent" onPress={this.findIntent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
