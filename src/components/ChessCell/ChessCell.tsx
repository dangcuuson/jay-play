import React = require('react');
import { ChessBoardState, CellPosition } from 'logic';
import { ChessPiece } from 'components';

type ChessCellProps = {
    cellSize: number;
    pos: CellPosition;
    boardState: ChessBoardState;
    onCellSelected?: (row: number, col: number) => void;
};

export class ChessCell extends React.Component<ChessCellProps, {}> {
    render() {
        const { cellSize } = this.props;
        const { pieces } = this.props.boardState;
        const { col, row } = this.props.pos;

        const pieceAtThisCell = pieces.find(p => p.position.col === col && p.position.row === row);
        const chessPiece = !!pieceAtThisCell && <ChessPiece {...pieceAtThisCell.piece} />;

        // cell style: (normal/selected/can move/can capture) * 2
        const cellStyles: Record<'normal' | 'selected' | 'canMove' | 'canCapture', React.CSSProperties[]> = {
            canCapture: [],
            canMove: [],
            normal: [{ backgroundColor: '#ffffff' }, { backgroundColor: '#4a7b86' }],
            selected: [{ backgroundColor: '#ffffff' }, { backgroundColor: '#4a7b86' }]
        };
        const cellType = (row + col) % 2;
        let selectedStyle = cellStyles.normal[cellType];

        return (
            <div
                key={col}
                className={'cell'}
                style={{ width: `${cellSize}px`, height: `${cellSize}px`, ...selectedStyle }}
                children={chessPiece}
                onTouchTap={() => { if (this.props.onCellSelected) { this.props.onCellSelected(col, row); } }}
            />
        );
    }
}