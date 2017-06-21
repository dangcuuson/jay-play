import React = require('react');
import { CellPosition, ChessPiece } from 'logic/ChessLogic';

type ChessCellProps = {
    readonly pos: CellPosition
    piece?: ChessPiece
};

export class ChessCell extends React.Component<ChessCellProps, {}> {
    render() {
        return <div/>;
    }
}