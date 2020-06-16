import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import splashBack from "./assets/images/splash.png";

export default class Splash extends React.Component {
    render() {
        return (
        <View style={styles.splash}>
            <Image style={styles.image} source={splashBack} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "100%"
    }
});
