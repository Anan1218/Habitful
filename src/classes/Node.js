import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";
import { Input, Block, Text, Button } from "galio-framework";

// If this is not a PureComponent rather than a Component, it will not update correctly.
// These Nodes are displayed in a list, and have to be updated periodically. React does not
// automatically update the components if the before and after are the same components,
// even if the props are different. PureComponent does not do this.
export class Node extends PureComponent {
    constructor(props) {
        super(props);
        let style = styles.btnBroken;
        if (this.props.status === "perfect") {
            style = styles.btn;
        } else if (this.props.status === "partial") {
            style = styles.btnActive;
        } else if (this.props.status === "skipped") {
            style = styles.btnSkipped;
        }
        this.state = {
            date: this.props.date,
            style: style,
        };
        console.log("node constructor");
    }

    getStyle = (status) => {
        let style = styles.btnBroken;
        if (status === "perfect") {
            style = styles.btn;
        } else if (status === "partial") {
            style = styles.btnActive;
        } else if (status === "skipped") {
            style = styles.btnSkipped;
        }
        return style;
    };

    render() {
        return (
            <Button shadowless style={this.getStyle(this.props.status)}>
                <Text>{this.props.date}</Text>
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        backgroundColor: "#FF5888",
        borderRadius: 50,
        borderColor: "#FF5888",
        borderWidth: 2,
    },

    btnActive: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 50,
        borderColor: "#FF5888",
        borderWidth: 2,
    },

    btnSkipped: {
        width: 40,
        height: 40,
        backgroundColor: "lightgrey",
        borderRadius: 50,
        borderColor: "#FF5888",
        borderWidth: 1,
    },

    btnBroken: {
        width: 40,
        height: 40,
        backgroundColor: "red",
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 1,
    },
});

export default Node;
