import { normalize, schema } from 'normalizr';
import filterDummy from './filter-dummy.json';

const option = new schema.Entity('filterOptions', {}, {
    idAttribute: (value, parent) => {
        return parent.name + '_' + value.value;
    },
    processStrategy: (value, parent) => {
        let v = parent.name + '_' + value.value;
        return {
            ...value,
            value: v
        };
    }
});

const selection = new schema.Entity('filterSelections', {
    options: [option]
}, {
    idAttribute: 'name'
});

const filter = new schema.Entity('filterTypes', {
    filters: [selection]
});

const { entities } = normalize(filterDummy, [filter]);

export default entities;
