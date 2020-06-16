import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
    ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Icon extends Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        style: Image.propTypes.style,
        source: Image.propTypes.source,
    };

    render() {
        let source;
        let icon;

        if (this.props.source) {
            source = this.props.source;
        }

        if (source && !icon) {
            icon = (
                <Image
                    style={[
                        styles.icon,
                        this.props.style,
                    ]}
                    source={source}
                />
            );
        }

        return (
            <View
                style={[
                    styles.container,
                    this.props.containerStyle,
                ]}
            >
                {icon}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#FFFFFF',
    },
});
