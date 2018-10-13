import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, map, filter, get, find } from 'lodash/fp';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import cn from 'classnames';

import MultiSelectableList from '../../components/common/MultiSelectableList';
import { changeCustomHeaders } from './actions';

import styles from './FilterCustomSelect.module.css';

class FilterCustomSelect extends Component {
    render() {
        let {
            response: { headers },
            customHeaderIds,
            changeCustomHeaders
        } = this.props;

        let selectedheaders = customHeaderIds === "all" ?
            headers :
            flow(
                map(id => find(header => header.id === id, headers)),
                filter(item => !!item)
            )(customHeaderIds);

        return (
            <div className={styles.main}>
                <MultiSelectableList
                    data={headers}
                    value={selectedheaders}
                    onChange={(value) => changeCustomHeaders(map(item => item.id, value))}>
                    {(item, isSelected) => {
                        let icon = isSelected ?
                            <FiCheckSquare/> :
                            <FiSquare/>;
                        return <div className={cn("custom__item", { selected: isSelected })}>
                            <span className="custom__check-icon">{icon}</span>
                            {item.label}
                        </div>
                    }}
                </MultiSelectableList>
            </div>
        )
    }
}

export default connect(
    (state) => (get('filters.results', state)),
    { changeCustomHeaders }
)(FilterCustomSelect)