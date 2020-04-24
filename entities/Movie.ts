export default interface Movie {
    volumeInfo: {
        title: string,
        authors: string[],
        description: string,
        publishedDate: string,
        imageLinks: {
            thumbnail: string
        },
        buyLink: string
    }
}
