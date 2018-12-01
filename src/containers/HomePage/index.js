import React, { Component } from 'react';

import Banner from './Banner';
import MainTools from './MainTools';
import News from './News';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <MainTools/>
                <hr/>
                <News/>
            </div>
        )
    }
}