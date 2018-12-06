import React from 'react';
import FilterTable from './FilterTable';

const FilterSummary = (props) => {
    let {
        headerIds = "all",
        headers,
        body
    } = props;
    return (
        <FilterTable headerIds={headerIds} headers={headers} body={body}/>
    );
}

export default FilterSummary;
