import React, { Component } from 'react';
import MultiGrid from 'react-virtualized/dist/es/MultiGrid';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import CellMeasurer from 'react-virtualized/dist/es/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/es/CellMeasurer/CellMeasurerCache';
import styles from './styles.module.css';

const list = [
    ['No.', 'Ticker', 'Company', 'Sector', 'Industry', 'Country', 'Market Cap', 'P/E', 'Fwd P/E', 'PEG', 'P/S', 'P/B', 'P/C', 'Price', 'Change', 'Volume' ],
    ['1', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories , Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['2', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['3', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['4', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['5', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['6', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['7', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['8', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['9', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['10', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
    ['11', 'A', 'Agilent Technologies, Inc.', 'Healthcare', 'Medical Laboratories & Research', 'USA', '22.67B', '27.68', '23.85', '2.55', '4.71', '4.96', '10.64', '70.72', '-0.58%', '3,119,673'],
]

const cache = new CellMeasurerCache({
    defaultWidth: 100,
    minWidth: 75,
    fixedHeight: true
});

function cellRenderer ({ columnIndex, key, rowIndex, style, parent }) {
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
                {list[rowIndex][columnIndex]}
            </div>
        </CellMeasurer>
    )
}

export default class FilterSummary extends Component {
    render() {
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
                        columnWidth={(ref) => cache.columnWidth(ref) + 20}
                        columnCount={16}
                        fixedColumnCount={1}
                        fixedRowCount={0}
                        height={40 * list.length + 40}
                        rowHeight={40}
                        rowCount={list.length}
                        width={width}
                        overscanColumnCount={0}
                        overscanRowCount={0}/>
                )}
            </AutoSizer>
        );
    }
}