import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ListItem from '../ListItem/ListItem';

const RecipeList = props => {
    renderSeparator = () => {
        return (
            <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CED0CE"
            }}
            />
        );
    };
    return (
        <FlatList
            style={styles.listContainer}
            data={props.recipes.filter(recipe => {
                return recipe.name.toLowerCase().includes(props.filter.toLowerCase());
            })}
            ItemSeparatorComponent={renderSeparator}
            renderItem={(info) => {
                return (
                    <ListItem 
                        name={info.item.name} 
                        image={info.item.image}
                        onItemPressed={() => props.onItemShow(info.item.id)}
                    />
                );
            }}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({    
    listContainer: {
        marginTop: 10,
        width: "100%"
    }
});

export default RecipeList;