import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import "react-native-gesture-handler";
// const { NlpManager } = require('node-nlp');
import NlpManager from "node-nlp-rn";

// import natural from "natural";
export default class TrainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
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
const manager = new NlpManager({ languages: ['en'] });
// Adds the utterances and intents for the NLP
// manager.addDocument('en', 'goodbye for now', 'greetings.bye');
// manager.addDocument('en', 'bye bye take care', 'greetings.bye');
// manager.addDocument('en', 'okay see you later', 'greetings.bye');
// manager.addDocument('en', 'bye for now', 'greetings.bye');
// manager.addDocument('en', 'i must go', 'greetings.bye');
// manager.addDocument('en', 'hello', 'greetings.hello');
// manager.addDocument('en', 'hi', 'greetings.hello');
// manager.addDocument('en', 'howdy', 'greetings.hello');

// // Train also the NLG
// manager.addAnswer('en', 'greetings.bye', 'Till next time');
// manager.addAnswer('en', 'greetings.bye', 'see you soon!');
// manager.addAnswer('en', 'greetings.hello', 'Hey there!');
// manager.addAnswer('en', 'greetings.hello', 'Greetings!');

// // Train and save the model.
// (async() => {
//     await manager.train();
//     manager.save();
//     const response = await manager.process('en', 'I should go now');
//     console.log(response);
// })();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
