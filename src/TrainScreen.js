import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import "react-native-gesture-handler";
// const { NlpManager } = require('node-nlp');
// import NlpManager from "node-nlp-rn";
const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

export default class TrainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidMount = async () => {
    const container = await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.addLanguage('en');
    // Adds the utterances and intents for the NLP
    nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
    nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
    nlp.addDocument('en', 'okay see you later', 'greetings.bye');
    nlp.addDocument('en', 'bye for now', 'greetings.bye');
    nlp.addDocument('en', 'i must go', 'greetings.bye');
    nlp.addDocument('en', 'hello', 'greetings.hello');
    nlp.addDocument('en', 'hi', 'greetings.hello');
    nlp.addDocument('en', 'howdy', 'greetings.hello');
    
    // Train also the NLG
    nlp.addAnswer('en', 'greetings.bye', 'Till next time');
    nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
    nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
    nlp.addAnswer('en', 'greetings.hello', 'Greetings!');
    await nlp.train();
    const response = await nlp.process('en', 'Well, take a seat!');
    console.log(response);
  }
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
