import * as ChessConstants from './ChessConstants';

export default class ChessPiece {
    
    name = ""
    side = ""

    constructor(name, side) {
        if (!ChessConstants.ALL_CHESS_PIECES.find(name)) {
            throw new Error(`Invalid chess name: ${name}`);
        }

        if (side !== ChessConstants.CHESS_SIDE_BLACK && side !== ChessConstants.CHESS_SIDE_WHITE) {
            throw new Error(`Invalid chess side: ${side}`);
        }

        this.name = name;
        this.side = side;
    }

    getImgPath() {
        return `assets/images/${this.name}_${this.side}.svg`;
    }

    getInitialPosition() {
        
    }
}