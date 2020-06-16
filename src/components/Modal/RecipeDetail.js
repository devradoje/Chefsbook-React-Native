import React, { Component } from 'react';
import { Modal, View, Image, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import ActionBar from 'react-native-action-bar';
import logo from '../../assets/images/logo.png';
import { Card, Text, Button, Icon } from 'react-native-elements';

class RecipeDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    onDelete = () => {
        Alert.alert(
            'Warning',
            'Are you sure to delete this recipe permanently?',
            [
              {text: 'Cancel', onPress: () => {}},
              {text: 'OK', onPress: this.props.onDelete}
            ]
        );
    }

    render() {
        let modalContent = null;
        if (this.props.recipe) {
            modalContent = (
                <View style={{ width:"100%" }}>
                    <ActionBar
                        containerStyle={styles.bar}
                        searchMode={false}
                        leftIconImage={logo}
                        leftIconImageStyle={{ width: 25, height: 25 }}
                        title={this.props.recipe.name}
                        backgroundColor="#3E4EB8"
                    />
                    <ScrollView style={styles.scrollArea}>         
                        {
                            this.props.recipe.ingredients.length > 0 && 
                            (<Card containerStyle={styles.card}>
                                <Text style={styles.cardTitle}>
                                    Ingredients
                                </Text>
                                {
                                    this.props.recipe.ingredients.map((value, index) => {
                                        return (
                                            <View style={styles.ingredientBox} key={index}>
                                                <Text>{index + 1}. {value}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </Card>)
                        }
                        {
                            this.props.recipe.note !== "" && 
                            (<Card containerStyle={styles.card}>
                                <Text style={styles.cardTitle}>
                                    Notes
                                </Text>
                                <Text>{this.props.recipe.note}</Text>
                            </Card>)
                        }
                        {
                            this.props.recipe.image !== null &&
                            (<Card containerStyle={styles.card}>
                                <Text style={styles.cardTitle}>
                                    Image
                                </Text>
                                <Image source={this.props.recipe.image} style={{ height: 300, width: "100%" }} resizeMode="stretch" />
                            </Card>)
                        }
                        <View style={{ marginTop: 20 }}>
                        </View>
                    </ScrollView>
                    
                </View>
            );
        }
        return (
            <Modal 
            onRequestClose={this.props.onModalClosed} 
            visible={this.props.recipe !== null} 
            animationType="fade"
            style={{ width: "100%" }}>
                <View style={styles.modalContainer}>
                    {modalContent}
                </View>
                <View style={styles.footerBox}>
                    <Button
                        buttonStyle={{ backgroundColor: "transparent" }}
                        icon={
                            <Icon
                                name='arrow-back'
                                size={20}
                                color='white'
                            />
                        }
                        title="Back"
                        onPress={this.props.onModalClosed}
                    />
                    <View style={{ width: 50 }}></View>
                    <Button
                        buttonStyle={{ backgroundColor: "transparent" }}
                        icon={
                            <Icon
                                name='edit'
                                size={20}
                                color='white'
                            />
                        }
                        title="Edit"
                        onPress={this.props.onEdit}
                    />
                    <View style={{ width: 50 }}></View>
                    <Button
                        buttonStyle={{ backgroundColor: "transparent" }}
                        icon={
                            <Icon
                                name='delete'
                                size={20}
                                color='white'
                            />
                        }
                        title="Delete"
                        onPress={this.onDelete}
                    />
                </View>
            </Modal>
        );
    }

    
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%"
    },
    scrollArea: {
        backgroundColor: "white",
        width: "100%"
    },
    footerBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: (Platform.OS === 'ios') ? 60 : 40,
        backgroundColor: "#3E4EB8",
        borderTopColor: "#606CBB",
        borderTopWidth: 1
    },
    card: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 15
    },
    cardTitle: {
        marginBottom: 10, 
        fontWeight: "bold",
        color: "#3E4EB8"
    },
    ingredientBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%"
    }
})

export default RecipeDetail;