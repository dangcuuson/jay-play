import { range } from 'lodash';

export type ChessName = 'BISHOP' | 'KING' | 'KNIGHT' | 'PAWN' | 'QUEEN' | 'ROOK';
export const allChessName: ChessName[] = ['BISHOP', 'KING', 'KNIGHT', 'PAWN', 'QUEEN', 'ROOK'];

export type ChessSide = 'BLACK' | 'WHITE';
export const allChessSide: ChessSide[] = ['BLACK', 'WHITE'];

export type ChessPiece = {
    name: ChessName;
    side: ChessSide;
};

export type CellPosition = {
    row: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
};

/**
 * @member type: move: move to cell; attack: remove enemy's piece; promote: promote to another piece (PAWN only)
 */
export type PossibleMove = {
    type: 'move' | 'attack' | 'promote';
    pos: CellPosition;
};

export type PieceWithPosition = {
    piece: ChessPiece;
    position: CellPosition;
};

export const getChessPieceInitPositions = (): PieceWithPosition[] => {
    let allPieces: PieceWithPosition[] = [];

    // init PAWNS
    const allRows: CellPosition['row'][] = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const allCols: CellPosition['col'][] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let col of allCols) {
        allPieces.push({
            piece: { name: 'PAWN', side: 'WHITE' },
            position: { col, row: '2' }
        });

        allPieces.push({
            piece: { name: 'PAWN', side: 'BLACK' },
            position: { col, row: '7' }
        });
    }

    // init the rest (ROOK, KNIGH, BISHOP, KING, and QUEEN)
    const symetryPiecesPositionConfig: { name: ChessName, cols: CellPosition['col'][] }[] = [
        { name: 'ROOK', cols: ['A', 'H'] },
        { name: 'KNIGHT', cols: ['B', 'G'] },
        { name: 'ROOK', cols: ['C', 'F'] }
    ];
    for (let side of allChessSide) {
        const row: CellPosition['row'] = side === 'BLACK' ? '8' : '1';
        for (let positionConfig of symetryPiecesPositionConfig) {
            for (let col of positionConfig.cols) {
                allPieces.push({
                    piece: { name: positionConfig.name, side },
                    position: { row, col }
                });
            }
        }
        allPieces.push({
            piece: { name: 'QUEEN', side },
            position: { row, col: 'D' }
        });
        allPieces.push({
            piece: { name: 'KING', side },
            position: { row, col: 'E' }
        });
    }

    return allPieces;
};

export function findPieceAtPosition(
    pieces: PieceWithPosition[],
    rowIndex: number,
    colIndex: number
): PieceWithPosition | undefined {

    return pieces.find(piece => {
        if ((+piece.position.row - 1) !== rowIndex) { return false; }

        const firstCol: CellPosition['col'] = 'A';
        return (piece.position.col.charCodeAt(0) - firstCol.charCodeAt(0)) === colIndex;
    });

};

export const getPossibleMoves = (currentPiece: PieceWithPosition, otherPieces: PieceWithPosition[]): PossibleMove[] => {

    return [];
};

const getPossibleMovesOfPawn = (currentPiece: PieceWithPosition, otherPieces: PieceWithPosition[]): PossibleMove[] => {

    const isAtInitPosition = currentPiece.piece.side === 'BLACK'
        ? currentPiece.position.row === '7'
        : currentPiece.position.row === '2';

    return [];
};