import React = require('react');

type ChessCellProps = {
    row: '1' | '2' | '3' | '4' | '5' | '6' | '7' |'8';
    col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
};

export class ChellCell extends React.Component<{}, {}> {
    render() {
        return <div/>;
    }
}