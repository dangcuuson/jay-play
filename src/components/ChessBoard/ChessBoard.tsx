import React = require('react');
import './ChessBoard.css';
import { ChessPiece as ChessPieceComponent } from 'components';
import { PieceWithPosition, ChessBoardState, ChessMovement, getChessPieceInitPositions, getPossibleMoves } from 'logic';

type Props = {
    cellSize?: number; // in pixel
};

type State = ChessBoardState & {
    selectedPiece?: PieceWithPosition;
    possibleMoves: ChessMovement[];
};

export class ChessBoard extends React.Component<Props, State> {

    static defaultProps: Partial<Props> = {
        cellSize: 75
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            pieces: getChessPieceInitPositions(),
            capturedPices: [],
            possibleMoves: []
        };

        this.onCellSelected = this.onCellSelected.bind(this);
    }

    onCellSelected(row: number, col: number) {
        const pieceAtThisCell = this.state.pieces.find(p => p.position.col === col && p.position.row === row);
        if (pieceAtThisCell) {
            const possibleMoves = getPossibleMoves(pieceAtThisCell, this.state);
            this.setState({ selectedPiece: pieceAtThisCell, possibleMoves: possibleMoves });
        }
    }

    renderBoard() {
        const { cellSize } = this.props;
        const _0To7 = [0, 1, 2, 3, 4, 5, 6, 7];
        const _7To0 = [7, 6, 5, 4, 3, 2, 1, 0];

        const renderOneRow = (row: number) => {
            return _0To7.map(col => {
                // cell style: (normal/selected/can move/can capture) * 2
                const cellStyles: Record<'normal' | 'selected' | 'canMove' | 'canCapture', React.CSSProperties[]> = {
                    canCapture: [],
                    canMove: [
                        { background: 'repeating-linear-gradient(-55deg, #ffffff, #ffffff 10px, #dddddd 10px, #dddddd 20px)' },
                        { background: 'repeating-linear-gradient(-55deg, #4a7b86, #4a7b86 10px, #6c9da8 10px, #6c9da8 20px)' }
                    ],
                    normal: [{ backgroundColor: '#ffffff' }, { backgroundColor: '#4a7b86' }],
                    selected: [{ backgroundColor: '#dddddd' }, { backgroundColor: '#6c9da8' }]
                };

                const cellType = (row + col) % 2;
                let selectedStyle = cellStyles.normal[cellType];

                const { selectedPiece, possibleMoves } = this.state;
                if (selectedPiece) {
                    if (selectedPiece.position.col === col && selectedPiece.position.row === row) {
                        selectedStyle = cellStyles.selected[cellType];
                    }
                }
                const moveable = possibleMoves.find(m => m.pos.col === col && m.pos.row === row);
                if (moveable) {
                    selectedStyle = cellStyles.canMove[cellType];
                }

                const pieceAtThisCell = this.state.pieces.find(p => p.position.col === col && p.position.row === row);
                const chessPiece = !!pieceAtThisCell && <ChessPieceComponent {...pieceAtThisCell.piece} />;
                return (
                    <div
                        key={col}
                        className={'cell'}
                        style={{ width: `${cellSize}px`, height: `${cellSize}px`, ...selectedStyle }}
                        children={chessPiece}
                        onTouchTap={() => this.onCellSelected(row, col)}
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