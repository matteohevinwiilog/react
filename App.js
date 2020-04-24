import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TextInput} from 'react-native';
import {key} from "./assets/api_credentials";
import {
    List,
    Loader,
    SearchInput
} from "./components/components";

export default class App extends React.Component {
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
        this.setState({state: this.state}, this.retrieveMovies);
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
                this.setState({state: this.state});
            });
        } else {
            this.movies = [];
            this.loading = false;
            this.forceEmpty = true;
            this.setState({state: this.state});
        }
    }

    render() {
        return (
            this.movies && this.movies.length > 0 && !this.forceEmpty ?
                this.loading ?
                    <View style={styles.container}>
                        <SearchInput callback={this.textChanged}/>
                        <Loader/>
                        <List movies={this.movies}/>
                    </View>
                    :
                    <View style={styles.container}>
                        <SearchInput callback={this.textChanged}/>
                        <List movies={this.movies}/>
                    </View>
                :
                this.loading ?
                    <View style={styles.container}>
                        <SearchInput callback={this.textChanged}/>
                        <Loader/>
                    </View>
                    :
                    <View style={styles.container}>
                        <SearchInput callback={this.textChanged}/>
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
