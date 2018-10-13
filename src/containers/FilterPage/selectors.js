import { get } from 'lodash/fp';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { filterSchema } from './data/normalizr-dummy';

export const filtersSelector = createSelector(
    get('entities.filters'),
    get('entities.filterTypes'),
    get('entities.filterOptions'),
    get('entities.filterSelections'),
    (filters, filterTypes, filterOptions, filterSelections) => denormalize(
        filters,
        [filterSchema],
        { filterTypes, filterOptions, filterSelections }
    ) 
);

export const selectedFiltersSelector = createSelector(
    get('filters.selectedFilters'),
    get('entities.filterOptions'),
    (filters, options) => filters.map(value => options[value])
);

export const countSelectedFiltersSelector = createSelector(
    selectedFiltersSelector,
    (filters) => filters
        .reduce((accum, option) => {
            let type = option.filterType;
            let old = accum[type];
            accum[type] = old ? old + 1 : 1;
            return accum;
        }, {})
)