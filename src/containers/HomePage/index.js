import React, { Component } from 'react';

import Banner from './Banner';
import MainTools from './MainTools';
import News from './News';

function Hr() {
    return (
        <div className="container">
            <div  style={{ padding: "0 1.25rem " }}>
                <hr className="m-0"/>
            </div>
        </div>
    )
}

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <MainTools/>
                <Hr/>
                <News/>
            </div>
        )
    }
}