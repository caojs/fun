import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flow, curryRight, map, filter, range } from 'lodash-es';
import cn from 'classnames';
import MultiGrid from 'react-virtualized/dist/es/MultiGrid';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import MessageAlert, { Info } from '../../../../components/common/MessageAlert';

import styles from './index.module.css';

const makeCellRenderer = (cache, { headers, body }) => {
    const getter = (rowIndex, columnIndex) => {
        return rowIndex === 0 ?
            (headers[columnIndex]["label"]) :
            (body[rowIndex - 1][columnIndex]["value"]);
    };

    return ({ columnIndex, key, rowIndex, style, parent }) => {
        let isHeader = rowIndex === 0;
        let isOddRow = rowIndex % 2 === 0;
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={columnIndex}
                key={key}
                parent={parent}
                rowIndex={rowIndex}>
                <div
                    className={cn(styles.cell, {
                        [styles.headerRow]: isHeader,
                        [styles.evenRow]: !isOddRow,
                        [styles.oddRow]: isOddRow
                    })}
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
    if (Array.isArray(headerIds)) {
        return flow(
            curryRight(map, 2)(id => headers.findIndex(header => header.id === id)),
            curryRight(filter, 2)(idx => idx !== -1)
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

    let newHeaders = map(headerIndexs, idx => headers[idx]);
    let newBody = map(body, row => map(headerIndexs, idx => row[idx]));
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
                <MessageAlert type={Info} message="Nothing to show."/> :
                <AutoSizer disableHeight={true}>
                    {({width}) => (
                        <MultiGrid
                            classNameBottomLeftGrid="table__bt-grid"
                            classNameBottomRightGrid="table__br-grid"
                            classNameTopLeftGrid="table__tl-grid"
                            classNameTopRightGrid="table__tr-grid"
                            cellRenderer={cellRenderer}
                            deferredMeasurementCache={cache}
                            fixedColumnCount={tableColumnCount > 1 ? 1 : 0}
                            fixedRowCount={1}
                            columnCount={tableColumnCount}
                            rowCount={tableRowCount}
                            columnWidth={(ref) => cache.columnWidth(ref) + 20}
                            rowHeight={40}
                            width={width}
                            height={40 * tableRowCount + 20}
                            overscanColumnCount={0}
                            overscanRowCount={0}/>
                    )}
                </AutoSizer>
        );
    }
}