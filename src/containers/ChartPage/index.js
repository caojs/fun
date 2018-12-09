import React, { Component } from 'react';
import cn from 'classnames';
import BarRechart from './Bar';
import LineRechart from './Line';

const LineChartData = {
	data: [
        {name: '1997', uv: 12000, pv: 12200, amt: 24000},
        {name: '1998', uv: 13000, pv: 13980, amt: 22100},
        {name: '1999', uv: 12000, pv: 19800, amt: 22900},
        {name: '2000', uv: 14000, pv: 13908, amt: 20000},
        {name: '2001', uv: 16000, pv: 14800, amt: 21810},
        {name: '2002', uv: 18000, pv: 15800, amt: 25000},
        {name: '2003', uv: 19000, pv: 14300, amt: 21000},
        {name: '2004', uv: 17000, pv: 24000, amt: 24000},
        {name: '2005', uv: 20000, pv: 13098, amt: 22100},
        {name: '2006', uv: 22000, pv: 19800, amt: 22900},
        {name: '2007', uv: 27800, pv: 23908, amt: 20000},
        {name: '2008', uv: 26000, pv: 24800, amt: 21810},
        {name: '2009', uv: 25000, pv: 23800, amt: 25000},
        {name: '2010', uv: 28000, pv: 34300, amt: 21000},
        {name: '2011', uv: 36000, pv: 42400, amt: 24000},
        {name: '2012', uv: 31000, pv: 31398, amt: 22100},
        {name: '2013', uv: 34000, pv: 39800, amt: 22900},
        {name: '2014', uv: 32000, pv: 39080, amt: 20000},
        {name: '2015', uv: 34000, pv: 44800, amt: 20181},
        {name: '2016', uv: 36000, pv: 43800, amt: 20500},
        {name: '2017', uv: 40000, pv: 44300, amt: 20100},
        {name: '2018', uv: 46000, pv: 48800, amt: 20500}
    ],
    config: {
    	width: 600,
    	height: 300,
    	header: 'Portfolio Growth',
    	XAxis:{
    		dataKey: 'name',
    		fontSize: 12,
    		label:{value:"Year", offset: 0, fontSize: 12, position:"insideBottom" }
    	},
    	YAxis:{
    		fontSize: 12,
    		label:{ value: 'Portfolio Balance ($)', fontSize: 12,angle: -90, position: 'insideLeft' }
    	},
    	line: [{
    		dataKey: 'pv',
    		stroke: '#8884d8',
    		name: 'Portfolio 1'
    	},{
    		dataKey: 'uv',
    		stroke: '#82ca9d',
    		name: 'Portfolio 2'
    	}]
    }
}

const BarChartData = {
	data: [
        {name: '1997', uv: 40, pv: 24, amt: 24},
        {name: '1998', uv: -30, pv: 13, amt: 22},
        {name: '1999', uv: -20, pv: -90, amt: 22},
        {name: '2000', uv: 27, pv: 38, amt: 20},
        {name: '2001', uv: -18, pv: 40, amt: 21},
        {name: '2002', uv: 23, pv: -30, amt: 25},
        {name: '2003', uv: 34, pv: 40, amt: 21},
        {name: '2004', uv: 40, pv: 20, amt: 24},
        {name: '2005', uv: -30, pv: 18, amt: 20},
        {name: '2006', uv: -20, pv: -90, amt: 90},
        {name: '2007', uv: 27, pv: 38, amt: 20},
        {name: '2008', uv: -18, pv: 40, amt: 18},
        {name: '2009', uv: 23, pv: -30, amt: 20},
        {name: '2010', uv: 34, pv: 40, amt: 20},
        {name: '2011', uv: 40, pv: 20, amt: 40},
        {name: '2012', uv: -30, pv: 18, amt: 21},
        {name: '2013', uv: -20, pv: -90, amt: 29},
        {name: '2014', uv: 27, pv: 38, amt: 20},
        {name: '2015', uv: -18, pv: 40, amt: 28},
        {name: '2016', uv: 23, pv: -30, amt: 25},
        {name: '2017', uv: 34, pv: 40, amt: 21},
        {name: '2018', uv: 23, pv: -30, amt: 25}
    ],
    config: {
    	width: 600,
    	height: 300,
    	header: 'Annual Return',
    	XAxis:{
    		dataKey: 'name',
    		fontSize: 12,
    		label:{value:"Year", offset: 0, fontSize: 12, position:"insideBottom" }
    	},
    	YAxis:{
    		fontSize: 12,
    		label:{ value: 'Annual Return', fontSize: 12,angle: -90, position: 'insideLeft' }
    	},
    	bar: [{
    		dataKey: 'pv',
    		fill: '#8884d8',
    		fontSize: 12,
    		name: 'Portfolio 1'
    	},{
    		dataKey: 'uv',
    		fill: '#82ca9d',
    		fontSize: 12,
    		name: 'Portfolio 2'
    	}]
    }
}

class ChartPage extends Component {
	render() {
		return(
			<div className={cn("container")}>
				<LineRechart data={LineChartData.data} config={LineChartData.config}/>
				<br/>
				<br/>
				<br/>
				<BarRechart data={BarChartData.data} config={BarChartData.config}/>
			</div>
		)
	}
}

export default ChartPage;