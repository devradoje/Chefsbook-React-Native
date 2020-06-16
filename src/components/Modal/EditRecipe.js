import React, { Component } from 'react';
import { Modal, View, StyleSheet, ScrollView, Platform, Image, Alert, TouchableOpacity } from 'react-native';
import ActionBar from 'react-native-action-bar';
import logo from '../../assets/images/logo.png';
import { Card, Text, Input, Button, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

class EditRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            ingredients: [""],
            note: "",
            image: null
        }  
    }

    componentWillReceiveProps(nextProps) {
        let recipe = nextProps.recipe; 
        if (nextProps.isAddMode === false && recipe !== null) {
            this.setState({
                name: recipe.name,
                ingredients: recipe.ingredients.concat(""),
                note: recipe.note,
                image: recipe.image
            });
        }
        else {
            this.setState({
                name: "",
                ingredients: [""],
                note: "",
                image: null
            });
        }
    }

    onNameChange = value => {
        this.setState({ name: value });
    }

    onIngredientChange = (index, value) => {
        let ingredients = this.state.ingredients;
        if (index === ingredients.length - 1) {
            ingredients.push("");
        }
        ingredients[index] = value;
        this.setState({ ingredients });
    }

    onIngredientBlur = index => {
        let ingredients = this.state.ingredients;
        if (ingredients[index] === "" && index !== ingredients.length - 1) {
            ingredients.splice(index, 1);
        }
        this.setState({ ingredients });
    }

    onIngredientDelete = index => {
        let ingredients = this.state.ingredients;
        ingredients.splice(index, 1);
        this.setState({ ingredients });
    }

    onNoteChange = value => {
        this.setState({ note: value });
    }

    onSave = () => {
        let recipeData = this.state;
        recipeData.ingredients.pop();
        this.props.onSave(recipeData);
    }

    onBack = () => {
        Alert.alert(
            'Warning',
            'Do you want to go back without saving?',
            [
              {text: 'No', onPress: () => {}},
              {text: 'Yes', onPress: this.props.onModalClosed}
            ]
        );
    }

    onImagePick = () => {
        var options = {
            title: 'Select an image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                alert('ImagePicker Error: ' + response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let image = { uri: response.uri };            
                this.setState({ image });
            }
        });
    }

    render() {
        let modalContent = null;
        if (this.props.visible) {
            modalContent = (
                <View style={{ width:"100%" }}>
                    <ScrollView style={styles.scrollArea}>                   
                        <Card containerStyle={styles.card}>
                            <View>
                            <Text style={styles.cardTitle}>
                                Name
                            </Text>
                            <Input
                                onChangeText={this.onNameChange}
                                placeholder="Type recipe name here..."
                                value={this.state.name}
                            />
                            </View>
                        </Card>
                        <Card containerStyle={styles.card}>
                            <Text style={styles.cardTitle}>
                                Ingredients
                            </Text>
                            {
                                this.state.ingredients.map((value, index) => {
                                    return (
                                        <View style={styles.ingredientBox} key={index}>
                                            <Text>{index + 1}.</Text>
                                            <Input
                                                onChangeText={value => this.onIngredientChange(index, value)}
                                                onBlur={() => this.onIngredientBlur(index)}
                                                value={value}
                                                containerStyle={{ width: "80%" }}
                                                inputStyle={{ fontSize: 14, marginBottom: -5 }}
                                            />
                                            {
                                                index !== this.state.ingredients.length - 1?
                                                (<Icon
                                                    name='cancel'
                                                    color='red'
                                                    onPress={() => this.onIngredientDelete(index)}
                                                />):
                                                (<Icon
                                                    name='add'
                                                    color='gray'
                                                />)
                                            }
                                        </View>
                                    )
                                })
                            }
                        </Card>
                        <Card containerStyle={styles.card}>
                            <Text style={styles.cardTitle}>
                                Notes
                            </Text>
                            <Input
                                onChangeText={this.onNoteChange}
                                value={this.state.note}
                                placeholder="Write some notes here..."
                                containerStyle={{ width: "100%" }}
                                inputStyle={[{ height: 400, borderColor: "#ddd", borderWidth: 1, textAlignVertical: "top", fontSize: 15}]}
                                inputContainerStyle={[{borderBottomWidth: 0 }]}
                                underlineColorAndroid="transparent"
                                multiline={true}
                            />
                        </Card>
                        <Card containerStyle={styles.card}>
                            <Text style={styles.cardTitle}>
                                Image
                            </Text>
                            <View>
                            {
                                this.state.image !== null?
                                (
                                    <TouchableOpacity onPress={this.onImagePick}>
                                        <Image source={this.state.image} style={{ height: 300, width: "100%" }} resizeMode="stretch" />
                                    </TouchableOpacity>
                                ):
                                (
                                    <Button
                                    icon={
                                        <Icon
                                        name='add'
                                        size={50}
                                        color='#3E4EB8'
                                        />
                                    }
                                    onPress={this.onImagePick}
                                    title=''
                                    containerStyle={{ height: 200 }}
                                    buttonStyle={{ height: 200, backgroundColor: "#ddd" }}
                                    /> 
                                )
                            }
                            </View>
                        </Card>
                        <View style={{ marginTop: 20 }}>
                        </View>
                    </ScrollView>
                </View>
            );
        }
        return (
            <Modal 
            onRequestClose={this.onBack} 
            visible={this.props.visible} 
            animationType="fade"
            style={{ width: "100%" }}>
                <ActionBar
                    containerStyle={styles.bar}
                    searchMode={false}
                    leftIconImage={logo}
                    leftIconImageStyle={{ width: 25, height: 25 }}
                    title={this.props.isAddMode?'New Recipe':'Edit Recipe'}
                    backgroundColor="#3E4EB8"
                />
                {/* <Header
                    placement="left"
                    leftComponent={<MIcon source={logo} />}
                    centerComponent={{ text: 'New Recipe', style: { color: '#fff', fontSize: 20, fontWeight: "bold" } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                /> */}
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
                        onPress={this.onBack}
                    />
                    <View style={{ width: 100 }}></View>
                    <Button
                        buttonStyle={{ backgroundColor: "transparent" }}
                        icon={
                            <Icon
                                name='save'
                                size={20}
                                color='white'
                            />
                        }
                        title="Save"
                        onPress={this.onSave}
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

export default EditRecipe;