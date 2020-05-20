import React from "react";
import {key} from "../../assets/api_credentials";
import {StyleSheet, View} from "react-native";
import {TracksList, Loader, SearchInput} from "./utils";
import {Image} from 'react-native';

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.tracks = [];
        this.search = '';
        this.loading = false;
        this.forceEmpty = false;
        this.logo = require('../../assets/logo_black.png');
        this.textChanged = this.textChanged.bind(this);
    }

    textChanged(text) {
        this.search = text;
        this.loading = true;
        this.forceUpdate(this.retrieveTracks);
    }

    retrieveTracks() {
        if (this.search !== '') {
            this.forceEmpty = false;
            fetch('http://api.musixmatch.com/ws/1.1/track.search?'
                + `q=${this.search}&page_size=10&page=1&s_track_rating=desc&`
                + 'apikey=' + key
            ).then((rawResponse) => {
                return rawResponse.json()
            }).then((formattedResponse) => {
                this.tracks = formattedResponse.message.body.track_list;
                Promise.all(this.tracks.flatMap(track => this.retrieveTrackInfo(track.track.commontrack_id))).then((tracks) => {
                    this.tracks = tracks;
                    this.loading = false;
                    this.forceUpdate();
                });
            });
        } else {
            this.tracks = [];
            this.loading = false;
            this.forceEmpty = true;
            this.forceUpdate();
        }
    }

    retrieveTrackInfo(trackId) {
        return new Promise(resolve => {
            fetch('http://api.musixmatch.com/ws/1.1/track.get?'
                + `commontrack_id=${trackId}&`
                + 'apikey=' + key
            ).then((rawResponse) => {
                return rawResponse.json()
            }).then((formattedResponse) => {
                let track = formattedResponse.message.body.track;
                this.retrieveAlbumInfo(track.album_id).then((album) => {
                    resolve({
                        ...track,
                        cover: album.album_coverart_100x100
                    })
                });
            });
        });
    }

    retrieveAlbumInfo(albumId) {
        return new Promise(resolve => {
            fetch('http://api.musixmatch.com/ws/1.1/album.get?'
                + `album_id=${albumId}&`
                + 'apikey=' + key
            ).then((rawResponse) => {
                return rawResponse.json()
            }).then((formattedResponse) => {
                resolve(formattedResponse.message.body.album);
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.logo} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginRight: 10
                }}/>
                <SearchInput onChange={this.textChanged}/>
                <Loader loading={this.loading}/>
                <TracksList tracks={this.tracks}
                            navigation={this.props.navigation}
                            forceEmpty={this.forceEmpty}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    }
});
