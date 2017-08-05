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
 * @member pos: the target position of the move
 * @member type: 
 *  - move: move to cell
 *  - capture: capture enemy's piece
 *  - promote: promote to another piece (PAWN only)
 *  - enPassant: En passant (https://en.wikipedia.org/wiki/En_passant) (PAWN only)
 * @member capturePiece: the piece that will be captured (only when move type is capture or enPassant)
 */
export type ChessMovement = { pos: CellPosition; } & (
    {
        type: 'move' | 'promote';
    } | {
        type: 'capture' | 'enPassant';
        capturePiece: PieceWithPosition;
    }
);

export type PieceWithPosition = {
    piece: ChessPiece;
    position: CellPosition;
};

export type ChessBoardState = {
    pieces: PieceWithPosition[];
    capturedPices: ChessPiece[];
    enPassantVulnerable?: PieceWithPosition; // https://en.wikipedia.org/wiki/En_passant
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
        { name: 'ROOK', cols: [0, 7] },
        { name: 'KNIGHT', cols: [1, 6] },
        { name: 'BISHOP', cols: [2, 5] }
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

export const getPossibleMoves = (currentPiece: PieceWithPosition, boardState: ChessBoardState): ChessMovement[] => {
    switch (currentPiece.piece.name) {
        case 'PAWN':
            return getPossibleMovesOfPawn(currentPiece, boardState);
        case 'BISHOP':
        case 'KING':
        case 'KNIGHT':
        case 'QUEEN':
        case 'ROOK':
            return [];

        default:
            throw new Error('Unknown piece name');
    }
};

const findPieceAt = (pos: CellPosition, pieces: PieceWithPosition[]): PieceWithPosition | undefined => {
    return pieces.find(p => p.position.col === pos.col && p.position.row === pos.row);
};

type RelativeDistance = {
    forward?: number,
    left?: number
};

const getRelativeCell = (pieceWithPosition: PieceWithPosition, distance: RelativeDistance): CellPosition | undefined => {
    const { piece, position } = pieceWithPosition;
    const forward = distance.forward || 0;
    const left = distance.left || 0;

    const nextRow = piece.side === 'BLACK' ? position.row - forward : position.row + forward;
    const nextCol = piece.side === 'BLACK' ? position.col - left : position.col + left;

    if (nextRow < 0 || 7 < nextRow) { return undefined; }
    if (nextCol < 0 || 7 < nextCol) { return undefined; }

    return { col: nextCol, row: nextRow };
};

const getRelativeCellStrict = (pieceWithPosition: PieceWithPosition, distance: RelativeDistance): CellPosition => {
    const cellPos = getRelativeCell(pieceWithPosition, distance);
    if (!cellPos) {
        throw new Error('Next cell position is undefined');
    }
    return cellPos;
};

const getPossibleMovesOfPawn = (currentPiece: PieceWithPosition, boardState: ChessBoardState): ChessMovement[] => {
    const curPos = currentPiece.position;
    const { pieces } = boardState;
    const possibleMoves: ChessMovement[] = [];

    const cellInFront = getRelativeCell(currentPiece, { forward: 1 });
    if (!cellInFront) {
        throw new Error('A Pawn cannot go back, and it must promote when it reaches the end of the other side');
    }

    // if there are no piece in front of a Pawn, it can move forward
    if (!findPieceAt(cellInFront, pieces)) {
        // if it move to the end of the other side, it can promote
        if (cellInFront.row === 0 || cellInFront.row === 7) {
            possibleMoves.push({ type: 'promote', pos: cellInFront });
        } else {
            possibleMoves.push({ type: 'move', pos: cellInFront });

            // if a Pawn is at initial position, it can have double-step
            const isAtInitPosition = currentPiece.piece.side === 'BLACK' ? curPos.row === 6 : curPos.row === 1;
            if (isAtInitPosition) {
                const doubleCellInFront = getRelativeCellStrict(currentPiece, { forward: 2 });
                if (!findPieceAt(doubleCellInFront, pieces)) {
                    possibleMoves.push({ type: 'move', pos: doubleCellInFront });
                }
            }
        }
    }

    return possibleMoves;
};