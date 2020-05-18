import React from "react";
import {key} from "../../assets/api_credentials";
import {StyleSheet, View} from "react-native";
import {MovieList, Loader, SearchInput} from "./utils";

export default class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.movies = [];
        this.authorSearch = '';
        this.loading = false;
        this.forceEmpty = false;
        this.textChanged = this.textChanged.bind(this);
    }

    textChanged(text) {
        this.authorSearch = text;
        this.loading = true;
        this.forceUpdate(this.retrieveMovies);
    }

    retrieveMovies() {
        if (this.authorSearch !== '') {
            this.forceEmpty = false;
            fetch('https://www.googleapis.com/books/v1/volumes?'
                + `q=inauthor:${this.authorSearch}&`
                + 'key=' + key
            ).then((rawResponse) => {
                return rawResponse.json()
            }).then((formattedResponse) => {
                this.movies = formattedResponse.items;
                this.loading = false;
                this.forceUpdate();
            });
        } else {
            this.movies = [];
            this.loading = false;
            this.forceEmpty = true;
            this.forceUpdate();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchInput onChange={this.textChanged}/>
                <Loader loading={this.loading}/>
                <MovieList movies={this.movies}
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
