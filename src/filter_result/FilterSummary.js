import React, { Component } from 'react';
import MultiGrid from 'react-virtualized/dist/es/MultiGrid';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';

import styles from './styles.module.css';

const makeCellRenderer = (cache, { headers, body }) => {
    const getter = (rowIndex, columnIndex) => {
        return rowIndex === 0 ?
            (headers[columnIndex]["label"]) :
            (body[rowIndex - 1][columnIndex]["value"]);
    };

    return ({ columnIndex, key, rowIndex, style, parent }) => {
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={columnIndex}
                key={key}
                parent={parent}
                rowIndex={rowIndex}>
                <div
                    className={styles.cell}
                    style={{
                        ...style,
                        whiteSpace: 'nowrap',
                    }}>
                    {getter(rowIndex, columnIndex)}
                </div>
            </CellMeasurer>
        )
    }
}

export default class FilterSummary extends Component {
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            defaultWidth: 100,
            minWidth: 75,
            fixedHeight: true
        });
    }

    render() {
        let { response } = this.props;
        let {
            headers = [],
            body = []
        } = response;

        let cache = this.cache;
        let cellRenderer = makeCellRenderer(cache, response);
        let tableColumnCount = headers.length;
        let tableRowCount = body.length + 1;

        return (
            tableColumnCount <= 0 ?
                <div>Wrong!</div> :
                <AutoSizer disableHeight={true}>
                    {({width}) => (
                        <MultiGrid
                            classNameBottomLeftGrid=""
                            classNameBottomRightGrid=""
                            classNameTopLeftGrid=""
                            classNameTopRightGrid=""
                            cellRenderer={cellRenderer}
                            deferredMeasurementCache={cache}
                            fixedColumnCount={1}
                            fixedRowCount={1}
                            columnCount={tableColumnCount}
                            rowCount={tableRowCount}
                            columnWidth={(ref) => cache.columnWidth(ref) + 20}
                            rowHeight={40}
                            width={width}
                            height={40 * tableRowCount + 5}
                            overscanColumnCount={0}
                            overscanRowCount={0}/>
                    )}
                </AutoSizer>
        );
    }
}
