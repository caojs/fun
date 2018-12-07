import React from 'react';
import { connect } from 'react-redux';
import Select from '../../../../components/common/Select';
import { onSelect } from '../../actions';

import styles from './index.module.scss';

const FilterSelect = ({ label, options, ...rest }) => {
    return (
        <Select
            {...rest}
            options={options}
            getOptionValue={(option) => option.value}>
            {({ OptionLabel, DropDownIcon, DropDownMenu }) => {
                return <React.Fragment>
                    <div>
                        <div className={styles.frame}>
                            <span className={styles.label}>{label}</span>
                            <DropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <DropDownMenu className={styles.dropdown}/>
                    </div>
                    <OptionLabel className={styles.optionLabel}/>
                </React.Fragment>
            }}
        </Select>
    )
};

export default connect(
    null,
    {
        onSelect
    }
)(FilterSelect);