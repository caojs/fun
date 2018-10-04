import React, { Component } from 'react';

import FilterTable from './FilterTable';
import FilterCustomSelect from './FilterCustomSelect';

let keyId = 0;

export default class FilterCustom extends Component {
    render() {
        let {
            headerIds,
            headers,
            body
        } = this.props;

        return (
            <div>
                <div>
                    <FilterCustomSelect/>
                </div>
                <FilterTable
                    key={keyId++}
                    {...this.props}/>
            </div>
        );
    }
}