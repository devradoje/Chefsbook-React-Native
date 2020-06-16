import React from 'react';

import { View, StyleSheet, Text } from 'react-native';

const renderSeparator = () => {
    return (
        <View style={{ paddingLeft: 20, paddingRight: 20 }} >
            <Text style={styles.title}>Ingredients</Text>
            <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE"
            }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#CED0CE',
        fontSize: 13
    }
});

export default renderSeparator;