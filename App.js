import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, ActivityIndicator} from 'react-native';
import {key} from "./assets/api_credentials";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        this.retrieveMovies();
    }

    retrieveMovies() {
        fetch('https://www.googleapis.com/books/v1/volumes?'
            + 'q=inauthor:musso&'
            + 'key=' + key
        ).then((rawResponse) => {
            return rawResponse.json()
        }).then((formattedResponse) => {
            this.setState({
                movies: formattedResponse.items
            });
        });
    }

    render() {
        return (
            this.state.movies.length > 0
                ?
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={this.state.movies}
                        renderItem={({item}) =>
                            (
                                <Item title={item.volumeInfo.title} image={item.volumeInfo.imageLinks.thumbnail}/>
                            )}/>
                </View>
                :
                <View style={styles.container}>
                    <ActivityIndicator color="#0000ff" size={100} animating/>
                </View>
        );
    }
}

function Item({ title, image }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Image source={{uri: image}} style={styles.listImage}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        paddingTop: 50,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#eee',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    listImage: {
        width: 100,
        height: 50,
    }
});
