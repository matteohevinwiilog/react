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

export function Loader() {
    return (
        <ActivityIndicator color="#0000ff" size={100} animating/>
    )
}

export function SearchInput({callback}) {
    return (
        <TextInput style={styles.input}
                   onChangeText={text => callback(text)}
                   placeholder="Search for an author...."/>
    )
}

export function List({movies}) {
    return (
        <FlatList
            contentContainerStyle={styles.listContainer}
            data={movies}
            renderItem={({item}) =>
                (
                    <Item movie={item}/>
                )}/>
    )
}

function Item({movie}) {
    return (
        <TouchableHighlight onPress={() => goToBuyingPage(movie.saleInfo.buyLink)} underlayColor="white">
            <View style={styles.item}>
                <Image source={
                    {
                        uri: movie.volumeInfo.imageLinks
                            ? movie.volumeInfo.imageLinks.thumbnail
                            : 'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'
                    }
                } style={styles.listImage}/>
                <Text style={styles.title}>{movie.volumeInfo.title}</Text>
                <Text style={styles.date}>{movie.volumeInfo.publishedDate}</Text>
                <Text style={styles.subtitle}>{
                    movie.volumeInfo.description
                        ?
                        movie.volumeInfo.description.slice(0, 97) + '...'
                        : 'Aucune description'
                }</Text>
            </View>
        </TouchableHighlight>
    );
}

function goToBuyingPage(buyingPage) {
    if (buyingPage) {
        Linking.openURL(buyingPage);
    }
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
