import React, { Component } from 'react';
import {LineChart, Label, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class LineRechart extends Component {
    render() {
        const {data, config} = this.props;
        return(
            <div className="line-chart">
                <h6 className="ml-4">{config.header}</h6>
                <LineChart width={config.width} height={config.height} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid vertical={false}/>
                <XAxis tickLine={false} {...config.XAxis}/>
                <YAxis {...config.YAxis} tickFormatter={(n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} axisLine={false} tickLine={false}/>
                <Tooltip cursor={false}/>
                <Legend verticalAlign="top" align="right" layout="vertical"/>
                {config.line.map((d, i) => <Line key={i} {...d} />)}
                </LineChart>
            </div>
        )
    }
}

export default LineRechart;