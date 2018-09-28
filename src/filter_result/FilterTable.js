import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, findIndex, filter, flow, range, isArray } from 'lodash/fp';
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

const getHeaderIndexs = (headers, headerIds) => {
    if (isArray(headerIds)) {
        return flow(
            map(id => findIndex(header => header.id === id, headers)),
            filter(idx => idx !== -1)
        )(headerIds);
    }

    if (headerIds === "all")
    {
        return range(0, headers.length);
    }

    throw new Error("Wrong type");
}

const customHeaders = ({ headerIds, headers, body }) => {
    let headerIndexs = getHeaderIndexs(headers, headerIds);

    let newHeaders = map(idx => headers[idx], headerIndexs);
    let newBody = map((row) => map(idx => row[idx], headerIndexs), body);
    return {
        headers: newHeaders,
        body: newBody
    };
};

export default class FilterTable extends Component {
    static propTypes = {
        headerIds: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        headers: PropTypes.array.isRequired,
        body: PropTypes.array.isRequired
    }

    cache = new CellMeasurerCache({
        defaultWidth: 100,
        minWidth: 75,
        fixedHeight: true
    });

    render() {
        let {
            headers,
            body
        } = customHeaders(this.props);

        let cache = this.cache;
        let cellRenderer = makeCellRenderer(cache, { headers, body });
        let tableColumnCount = headers.length;
        let tableRowCount = body.length + 1;

        return (
            tableColumnCount <= 0 ?
                <div>Nothing To Show!</div> :
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