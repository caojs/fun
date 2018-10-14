import { compose } from 'redux';
import masterData from './initialState/masterData';
import stateFromQuery from './initialState/stateFromQuery';

const initialState = {
    selectedFilters: [],
    search: "",
    order: [],
    signal: "",
    page: 0,
    results: {
        summaryHeaderIds: "all",
        customHeaderIds: "all",
        isLoading: false,
        isLoaded: false,
        response: null,
        error: null,
    }
};

export default compose(
    stateFromQuery,
    masterData,
    () => ({ filters: initialState })
);