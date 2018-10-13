import { normalize, schema } from 'normalizr';
import filterDummy from './filter-dummy.json';

const option = new schema.Entity('filterOptions', {}, {
    idAttribute: (value, parent) => {
        return `${parent.name}__${value.value}`;
    },
    processStrategy: (value, parent) => {
        let v = `${parent.name}__${value.value}`;
        return {
            ...value,
            id: v,
            value: v,
            selectLabel: parent.label,
            selectName: parent.name,
            filterType: parent.filterType
        };
    }
});

const selection = new schema.Entity('filterSelections', {
    options: [option]
}, {
    idAttribute: 'name',
    processStrategy: (value, parent) => {
        return {
            ...value,
            id: value.name,
            filterType: parent.type
        };
    }
});

export const filterSchema = new schema.Entity('filterTypes', {
    filters: [selection]
});

const normalizedData = normalize(filterDummy, [filterSchema]);

const { entities, result } = normalizedData;

export default ({
    ...entities,
    filters: result
});
