import { curryRight, get } from 'lodash-es';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import { filterSchema } from './initialState/masterData';

const getRight = curryRight(get, 2);

export const filtersSelector = createSelector(
    getRight('entities.filters'),
    getRight('entities.filterTypes'),
    getRight('entities.filterOptions'),
    getRight('entities.filterSelections'),
    (filters, filterTypes, filterOptions, filterSelections) => denormalize(
        filters,
        [filterSchema],
        { filterTypes, filterOptions, filterSelections }
    ) 
);

export const selectedFiltersSelector = createSelector(
    getRight('filters.selectedFilters'),
    getRight('entities.filterOptions'),
    (filters, options) => filters
        .map(value => options[value])
        .filter(value => Boolean(value))
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