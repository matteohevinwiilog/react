import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    Linking
} from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export function Loader({loading}) {
    return (
        loading
            ?
            <ActivityIndicator color="#0000ff" size={100} animating/>
            :
            <View/>
    )
}

export function SearchInput({onChange}) {
    return (
        <TextInput style={styles.input}
                   onChangeText={text => onChange(text)}
                   placeholder="Search for an author...."/>
    )
}

export function MovieList({movies, forceEmpty, navigation}) {
    return (
        movies && movies.length > 0 && !forceEmpty
            ?
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={movies}
                renderItem={({item}) =>
                    (
                        <MovieItem movie={item} navigation={navigation}/>
                    )}/>
            :
            <View/>
    )
}

function MovieItem({movie, navigation}) {
    return (
        <TouchableHighlight onPress={() => navigation.navigate("Details", movie)} underlayColor="white">
            <View style={styles.item}>
                <Image source={
                    {
                        uri: movie.volumeInfo.imageLinks
                            ? movie.volumeInfo.imageLinks.thumbnail
                            : 'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'
                    }
                } style={styles.listImage}/>
                <Text style={styles.title}>{movie.volumeInfo.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingTop: 50,
        justifyContent: 'center',
    },
    item: {
        backgroundColor: '#eee',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 30,
    },
    subtitle: {
        fontSize: 15,
    },
    date: {
        fontSize: 22
    },
    listImage: {
        width: '100%',
        height: 150,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 70,
        marginLeft: 20,
        marginRight: 20,
        padding: 10
    }
});
