import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import recipeImage from '../../assets/images/recipe.png';

const ListItem = props => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Image style={styles.image} source={recipeImage} resizeMode="cover" />
            <Text style={styles.text}>{props.name}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        marginRight: 8,
        width: 25,
        height: 25,
    },
    text: {
    }
});

export default ListItem;