import React = require('react');
import 'assets/images/BISHOP_BLACK.svg';
import './ChessBoard.css';

export class ChessBoard extends React.Component<{}, {}> {
    render() {
        return (
            <div className="chessboard">ChessBoard Here</div>
        );
    }
}