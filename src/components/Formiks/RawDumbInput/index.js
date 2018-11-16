import React, { Component } from 'react';
import { getIn, connect } from 'formik';
import cn from 'classnames';

class RawDumbInput extends Component {
    shouldComponentUpdate(newProps) {
        const {
            name,
            value: newValue,
            formik: { errors: e1 },
        } = newProps;

        const {
            value: oldValue,
            formik: { errors: e2 },
        } = this.props;

        const error1 = getIn(e1, name);
        const error2 = getIn(e2, name);

        return newValue !== oldValue || error1 !== error2;
    }

    render() {
        const {
            name,
            value,
            className,
            formik
        } = this.props;

        const {
            errors,
        } = formik;

        const error = getIn(errors, name);
        return (
            <>
                <input
                    className={cn(className, "form-control", {"is-invalid" : !!error})}
                    value={value}
                    readOnly/>
                {error && <div className="invalid-feedback">{error}</div>}
            </>
        )
    }

    componentDidUpdate() {
        const {
            formik,
            name,
            value
        } = this.props;
        formik.setFieldValue(name, value);
    }
}

export default connect(RawDumbInput);