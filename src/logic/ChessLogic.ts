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
    row: number; // 0-7
    col: number; // 0-7
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
    for (let col = 0; col < 8; col++) {
        allPieces.push({
            piece: { name: 'PAWN', side: 'WHITE' },
            position: { col, row: 1 }
        });

        allPieces.push({
            piece: { name: 'PAWN', side: 'BLACK' },
            position: { col, row: 6 }
        });
    }

    // init the rest (ROOK, KNIGH, BISHOP, KING, and QUEEN)
    const symetryPiecesPositionConfig: { name: ChessName, cols: number[] }[] = [
        { name: 'ROOK', cols: [1, 7] },
        { name: 'KNIGHT', cols: [2, 6] },
        { name: 'ROOK', cols: [3, 5] }
    ];
    for (let side of allChessSide) {
        const row: number = side === 'BLACK' ? 7 : 0;
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
            position: { row, col: 3 }
        });
        allPieces.push({
            piece: { name: 'KING', side },
            position: { row, col: 4 }
        });
    }

    return allPieces;
};

export const getPossibleMoves = (currentPiece: PieceWithPosition, otherPieces: PieceWithPosition[]): PossibleMove[] => {

    return [];
};

const getPossibleMovesOfPawn = (currentPiece: PieceWithPosition, otherPieces: PieceWithPosition[]): PossibleMove[] => {

    const isAtInitPosition = currentPiece.piece.side === 'BLACK'
        ? currentPiece.position.row === 6
        : currentPiece.position.row === 1;

    // get the cell in front of the piece (from its perspective)
    const getForwardCell = (): CellPosition => {
        const row = currentPiece.piece.side === 'BLACK'
            ? currentPiece.position.row - 1
            : currentPiece.position.row + 1;

        if (row < 0 || 7 < row) {
            throw new Error('A Pawn cannot go back, and it must promote when it reaches the end of the other side');
        }

        return {
            col: currentPiece.position.col,
            row: row
        };
    }

    return [];
};