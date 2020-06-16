import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import Splash from './src/Splash';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    
      this.state = {
          isSplash: true
    }
}

componentWillMount() {
    setTimeout(() => {
        this.setState({ isSplash: false });
    }, 4000);
}

render() {
    return this.state.isSplash?(
        <Splash/>
    ):(
        <Main/>
    );
}
}