import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flow, map, filter, get, curryRight } from 'lodash-es';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import cn from 'classnames';

import MultiSelectableList from '../../../components/common/MultiSelectableList';
import { changeCustomHeaders } from '../actions';

import styles from './FilterCustomSelect.module.css';

class FilterCustomSelect extends Component {
    render() {
        let {
            data: { headers },
            customHeaderIds,
            changeCustomHeaders
        } = this.props;

        let selectedheaders = customHeaderIds === "all" ?
            headers :
            flow(
                curryRight(map, 2)(id => headers.find(header => header.id === id)),
                curryRight(filter, 2)(item => !!item)
            )(customHeaderIds);

        return (
            <div className={styles.main}>
                <MultiSelectableList
                    data={headers}
                    value={selectedheaders}
                    onChange={(value) => changeCustomHeaders(map(value, item => item.id))}>
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
    (state) => get(state, 'filters.results'),
    { changeCustomHeaders }
)(FilterCustomSelect)