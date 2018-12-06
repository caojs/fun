import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { IoMdSearch } from 'react-icons/io';
import LoadableButton from '../../../components/common/LoadableButton';
import { searchName, applyFilters } from '../actions';

import styles from './FilterSearch.module.css';

class FilterSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.search };
        this.onChange = this.onChange.bind(this);
        this.onClickPromise = this.onClickPromise.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            text: props.search
        });
    }

    onChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    onClickPromise() {
        let { searchName } = this.props;

        return searchName(this.state.text);
    }

    render() {
        let {
            search,
        } = this.props;
        let { text } = this.state;

        return (
            <div className={styles.main}>
                <input
                    className={styles.input}
                    value={text}
                    onChange={this.onChange}
                    placeholder="Search..."/>
                <LoadableButton
                    className={styles.button}
                    disabled={text === search}
                    onClickPromise={this.onClickPromise}>
                    <IoMdSearch/>
                </LoadableButton>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        search: get(state, 'filters.search')
    }),
    {
        searchName,
        applyFilters
    }
)(FilterSearch)