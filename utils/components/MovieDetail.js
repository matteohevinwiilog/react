import React from "react";
import {View, Text} from "react-native";
import {WebView} from "react-native-webview";

export default class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.track = this.props.route.params;
    }

    render() {
        return (
            <WebView
                originWhitelist={['*']}
                source={
                    {
                        uri: this.track.track_share_url
                    }
                }/>
        )
    }
}
