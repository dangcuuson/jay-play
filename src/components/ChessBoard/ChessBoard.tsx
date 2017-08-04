import React = require('react');
import './ChessBoard.css';
import { ChessPiece as ChessPieceComponent } from 'components';
import { PieceWithPosition, CellPosition, getChessPieceInitPositions } from 'logic';
import { range } from 'lodash';

type Props = {
    cellSize?: number; // in pixel
};

type State = {
    pieces: PieceWithPosition[];
    selectedPiece?: PieceWithPosition;
};

export class ChessBoard extends React.Component<Props, State> {

    static defaultProps: Partial<Props> = {
        cellSize: 75
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            pieces: getChessPieceInitPositions()
        };

        this.onCellSelected = this.onCellSelected.bind(this);
    }

    onCellSelected(row: number, col: number) {
        const pieceAtThisCell = this.state.pieces.find(p => p.position.col === col && p.position.row === row);
    }

    renderBoard() {
        const { cellSize } = this.props;
        const _7To0 = [7, 6, 5, 4, 3, 2, 1, 0];

        const renderOneRow = (row: number) => {

            return _7To0.map(col => {
                const cellType = (row + col) % 2;
                const pieceAtThisCell = this.state.pieces.find(p => p.position.col === col && p.position.row === row);
                const chessPiece = !!pieceAtThisCell && <ChessPieceComponent {...pieceAtThisCell.piece} />;
                return (
                    <div
                        key={col}
                        className={cellType ? 'cell-type-2' : 'cell-type-1'}
                        style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                        children={chessPiece}
                    />
                );
            });
        };

        return _7To0.map(row => (<div key={row} className="row">{renderOneRow(row)}</div>));
    }

    render() {
        return (
            <div className="chessboard">
                {this.renderBoard()}
            </div>
        );
    }
}