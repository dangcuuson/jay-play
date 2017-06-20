import React = require('react');
import './ChessBoard.css';

const BishopBlack = require('assets/images/BISHOP_BLACK.svg');

export class ChessBoard extends React.Component<{}, {}> {
    render() {
        return (
            <div className="chessboard">
                ChessBoard here
                <span dangerouslySetInnerHTML={{__html: BishopBlack}}/>
            </div>
        );
    }
}