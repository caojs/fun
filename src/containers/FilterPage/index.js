import React from 'react';
import Filter from './Filter';
import ActivatedFilters from './FilterActived';
import FilterResult from './FilterResult';

export default function FilterPage() {
    return (
        <React.Fragment>
            <div className="row pb-4">
                <Filter/>
            </div>
            <div className="row pb-4">
                <ActivatedFilters/>
            </div>
            <div className="row pb-4">
                <FilterResult/>
            </div>
        </React.Fragment>
    );
}