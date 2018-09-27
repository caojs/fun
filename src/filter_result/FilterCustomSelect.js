import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, map, filter, get, find } from 'lodash/fp';
import cn from 'classnames';

import MultiSelectableList from '../common/MultiSelectableList';
import { actions } from '../ducks/filters';

class FilterCustomSelect extends Component {
    render() {
        let {
            response: { headers },
            customHeaderIds,
            changeCustomHeaders
        } = this.props;

        let selectedheaders = 
            flow(
                map(id => find(header => header.id === id, headers)),
                filter(item => !!item)
            )(customHeaderIds);

        return (
            <div>
                <MultiSelectableList
                    data={headers}
                    value={selectedheaders}
                    onChange={(value) => changeCustomHeaders(map(item => item.id, value))}>
                    {(item, isSelected) => {
                        return <span className={cn({ isSelected })}>{isSelected ? "select": ""} {item.label}</span>
                    }}
                </MultiSelectableList>
            </div>
        )
    }
}

export default connect(
    (state) => (get('filters.results', state)),
    { changeCustomHeaders: actions.changeCustomHeaders }
)(FilterCustomSelect)