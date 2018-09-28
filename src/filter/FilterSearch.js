import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import LoadableButton from '../common/LoadableButton';
import { actions } from '../ducks/filters';

class FilterSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { text: props.search };
        this.onChange = this.onChange.bind(this);
        this.onClickPromise = this.onClickPromise.bind(this);
    }

    onChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    onClickPromise() {
        let {
            doSearch,
            applyFilters
        } = this.props;
        return applyFilters("abc")
            .then(value => {
                doSearch(this.state.text);
                return value;
            });
    }

    render() {
        let {
            search,
        } = this.props;
        let { text } = this.state;

        return (
            <div>
                <input value={text} onChange={this.onChange} placeholder="Search..."/>
                    <LoadableButton
                        disabled={text === search}
                        onClickPromise={this.onClickPromise}>
                        <span>Search</span>
                    </LoadableButton>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        search: get('filters.search', state)
    }),
    {
        doSearch: actions.search,
        applyFilters: actions.applyFilters
    }
)(FilterSearch)