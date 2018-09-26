import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash/fp';

import MultiGrid from 'react-virtualized/dist/es/MultiGrid';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import styles from './styles.module.css';

const cache = new CellMeasurerCache({
    defaultWidth: 100,
    minWidth: 75,
    fixedHeight: true
});

const makeCellRenderer = ({ headers, body }) => {
    const getter = (rowIndex, columnIndex) => {
        return rowIndex == 0 ?
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

class FilterSummary extends Component {
    render() {
        let {
            results: { response, error }
        } = this.props;

        if (error) {
            return <div>Error!</div>
        }

        let {
            headers = [],
            body = []
        } = response;

        let cellRenderer = makeCellRenderer(response);

        let tableColumnCount = headers.length;
        let tableRowCount = body.length + 1;

        return (
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

export default connect((state) => ({
    results: get(`filters.results`, state)
}))(FilterSummary);