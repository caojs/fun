import React, { Component } from 'react';
import {BarChart, Bar, ReferenceLine, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class BarRechart extends Component {
	render() {
		const {data, config} = this.props;
		return(
			<div className="bar-chart">
				<h6 className="ml-4">{config.header}</h6>
				<BarChart width={config.width} height={config.height} data={data}
		          	margin={{top: 5, right: 30, left: 20, bottom: 5}}>
		          	<CartesianGrid vertical={false}/>
		          	<XAxis tickLine={false} {...config.XAxis}/>
	                <YAxis {...config.YAxis} tickFormatter={(n) => n.toString()+ '%'} axisLine={false} tickLine={false}/>
		          	<Tooltip cursor={false}/>
		          	<Legend verticalAlign="top" align="right" layout="vertical"/>
		          	<ReferenceLine y={0} stroke='#000'/>
		          	{config.bar.map((d, i) => <Bar key={i} {...d} />)}
	        	</BarChart>
			</div>
		)
	}
}

export default BarRechart;