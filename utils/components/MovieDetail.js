import React from "react";
import {View, Text} from "react-native";
import {WebView} from "react-native-webview";

export default class MovieDetail extends React.Component {

    constructor(props) {
        super(props);
        this.movie = this.props.route.params;
    }

    render() {
        let movieView = `<h1>Title : ${this.movie.volumeInfo.title}</h1>`;
        movieView += `<h1>Date : ${this.movie.volumeInfo.publishedDate}</h1>`;
        movieView += `<h1>Description : ${this.movie.volumeInfo.description ?? 'No description...'}</h1>`;
        movieView += `<h1>Authors : ${this.movie.volumeInfo.authors.join(',')}</h1>`;
        movieView += `<img alt="No image..." src="${this.movie.volumeInfo.imageLinks
            ?
            this.movie.volumeInfo.imageLinks.thumbnail
            : 'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'
        }">`;
        movieView += `<h1><a href="${this.movie.saleInfo.buyLink}">Buy</a></h1>`;
        return (
            <WebView
                originWhitelist={['*']}
                source={
                    {
                        html: movieView
                    }
                }/>
        )
    }
}
