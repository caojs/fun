import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';
import { actions } from '../ducks/filters';
import ReactPaginate from 'react-paginate';

class FilterPagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            pageCount,
            initialPage,
            onPageChange
        } = this.props;

        return (
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                initialPage={initialPage}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        );
    }
}

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        initialPage: get('filters.results.page', state)
    }),
    { onPageChange: ({ selected }) => actions.onPageChange(selected) }
)(FilterPagination)