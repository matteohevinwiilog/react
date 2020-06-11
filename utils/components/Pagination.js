import React from "react";
import {StyleSheet} from "react-native";
import {Button} from 'react-native';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.items = this.props.items;
        this.elementsPerPage = this.props.elementsPerPage;
        this.callback = this.props.callback;

        this.page = 1;
    }

    changePage(page) {
        this.setState({
            page: page
        });

        this.callback(page);
    }

    render() {
        let pages = this.items.length / this.elementsPerPage;
        let start = Math.max(1, this.page - 5);
        let end = Math.min(pages, this.page + 5);

        let buttons = [];

        for(let i = start; i <= end; ++i) {
            buttons.push(<PaginationButton page={i} callback={() => this.changePage(i)} />);
        }

        return buttons;
    }
}

class PaginationButton extends React.Component {
    constructor(props) {
        super(props);
        this.page = this.props.page;
        this.callback = this.props.callback;
    }

    render() {
        return (
            <Button
                title={this.number}
                onPress={this.callback}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    }
});
