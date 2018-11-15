import React, { Component } from 'react';

class RegexInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { regex } = this.props;
        const value = e.target.value;
        if (regex instanceof RegExp && regex.test(value)) {
            this.setState({ value });
        }
    }

    render() {
        const { value } = this.state;

        return (
            <input
                value={value}
                onChange={this.onChange}
                {...this.props}/>
        )
    }
}

export default RegexInput;