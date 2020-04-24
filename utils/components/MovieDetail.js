import React from "react";
import {View, Text} from "react-native";

export default class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.movie = this.props.route.params;
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.movie)}</Text>
            </View>
        )
    }
}
