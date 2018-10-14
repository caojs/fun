import React from 'react';
import Filter from './Filter';
import ActivatedFilters from './FilterActived';
import FilterResult from './FilterResult';

export default function FilterPage() {
    return (
        <React.Fragment>
            <Filter/>
            <ActivatedFilters/>
            <FilterResult/>
        </React.Fragment>
    );
}