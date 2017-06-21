import React = require('react');
import { ChessBoard as ChessBoardLogic } from 'logic/ChessLogic';

export class ChessBoard extends React.Component<{}, {}> {
    render() {
        return (
            <div className="chessboard">
                ChessBoard here
            </div>
        );
    }
}