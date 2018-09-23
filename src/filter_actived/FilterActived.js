import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, map, flatMap, toPairs, omitBy, isNil } from 'lodash/fp';
import Tag from '../common/Tag';

class ActivatedFilters extends Component {
    render() {
        let {activatedFilters} = this.props;
        return (
            <div>
                {activatedFilters.map(({ value, name }) => (
                    <Tag key={name} label={`${name} : ${value}`}/>
                ))}
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        let { filters = {} } = state;

        let activatedFilters = flow(
            toPairs,
            map(([type, o]) => [type, toPairs(omitBy(isNil, o))]),
            flatMap(([type, list]) => map(([name, value]) => ({type, name, value}), list))
        )(filters);

        return {
            ...ownProps,
            activatedFilters
        }
    }
)(ActivatedFilters)