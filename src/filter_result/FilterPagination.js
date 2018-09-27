import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../ducks/filters';
import ReactPaginate from 'react-paginate';

class FilterPagination extends Component {
    render() {
        let {
            response,
            onPageChange
        } = this.props;

        let {
            per_page: perPage,
            total_count: totalCount,
        } = response;

        let pageCount = Math.ceil(totalCount/perPage);

        return (
            pageCount > 1
                ? <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        initialPage={0}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={onPageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                : null
        );
    }
}

export default connect(
    null,
    { onPageChange: ({ selected }) => actions.onPageChange(selected) }
)(FilterPagination)