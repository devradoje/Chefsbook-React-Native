import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import RecipeList from './components/List/RecipeList';
import RecipeDetail from './components/Modal/RecipeDetail';
import EditRecipe from './components/Modal/EditRecipe';
import ActionBar from 'react-native-action-bar';
import logo from './assets/images/logo.png';

const store_key = '@Chefsbook:data';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            filterValue: "",
            recipes: [],
            currentRecipe: null,
            isEditModalVisible: false
        };
    }
    
    componentWillMount() {
        let data = this.loadData();
    }

    filterChangeHandler = val => {
        this.setState({ filterValue: val });
    }

    onShowHandler = index => {
        this.currentIndex = index;
        this.setState(prevState => {
            return {
                currentRecipe: prevState.recipes.find(recipe => {
                    return recipe.id === index;
                })
            };
        })
    }

    addHandler = () => {
        this.isAddMode = true;
        this.setState({ isEditModalVisible: true });
    }

    showModalClosed = () => {
        this.setState({ currentRecipe: null });
    }

    editModalClosed = () => {
        this.setState({ isEditModalVisible: false });
    }

    storeData = async (data) => {
        try {
            await AsyncStorage.setItem(store_key, JSON.stringify(data));
        } catch (error) {
            alert('Failed to save data into store.');
        }
    }

    addData = async (data) => {
        let len = this.state.recipes.length;
        let newId;
        if (len === 0) {
            newId = 1;
        }
        else {
            newId = this.state.recipes[len - 1].id + 1;
        }
        data["id"] = newId;
        let recipes = this.state.recipes;
        recipes.push(data);
        this.setState({ recipes });
        this.storeData(recipes);
    }

    loadData = async () => {
        try {
            const data = await AsyncStorage.getItem(store_key);
            if (data === null)
                data = [];
            else
                data = JSON.parse(data);
            if (data !== null) {
                this.setState({ recipes: data });
            }
        } catch (error) {
            alert('Failed to load data from store.');            
        }
    }

    onSaveHandler = newRecipe => {
        if (this.isAddMode) {
            this.addData(newRecipe);
        }
        else {
            let recipes = this.state.recipes;
            for (let i = 0; i < recipes.length; i++) {
                let recipe = recipes[i];
                if (recipe.id === this.currentIndex) {
                    recipes[i] = newRecipe;
                    break;
                }
            }
            this.setState({ recipes: recipes, currentRecipe: newRecipe });
            this.storeData(recipes);
        }
        this.editModalClosed();
    }

    onDeleteHandler = () => {
        let recipes = this.state.recipes;
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            if (recipe.id === this.currentIndex) {
                recipes.splice(i, 1);
                break;
            }
        }
        this.setState({ recipes: recipes, currentRecipe: null });
        this.storeData(recipes);
    }

    onEditHandler = () => {
        this.isAddMode = false;
        this.setState({ isEditModalVisible: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <EditRecipe
                    isAddMode={this.isAddMode}
                    recipe={this.state.currentRecipe}
                    visible={this.state.isEditModalVisible}
                    onModalClosed={this.editModalClosed}
                    onSave={this.onSaveHandler}
                />
                <RecipeDetail 
                    recipe={this.state.currentRecipe} 
                    onModalClosed={this.showModalClosed}
                    onDelete={this.onDeleteHandler}
                    onEdit={this.onEditHandler}
                />
                <ActionBar
                    leftIconImage={logo}
                    leftIconImageStyle={{ width: 25, height: 25 }}
                    containerStyle={styles.bar}
                    searchMode={true}
                    title={'search'}
                    backgroundColor="#3E4EB8"
                    placeholder="Type here to search..."
                    searchValue={this.state.filterValue}
                    onChangeText={this.filterChangeHandler} 
                    rightIcons={[
                        {
                            name: 'plus',
                            onPress: this.addHandler,
                        },
                    ]}
                />
                <View style={{ width: "100%", height: "100%" }}>
                    <View style={styles.listContainer}>
                        <RecipeList 
                            filter={this.state.filterValue} 
                            recipes={this.state.recipes} 
                            onItemShow={this.onShowHandler}
                        />
                    </View>
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    listContainer: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    filterInput: {
        width: '80%'
    },
    addButton: {
        width: '20%'
    }
});
