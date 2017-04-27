import ChessPiece from './ChessPiece';
import ChessConstants from './ChessConstants';

function initChessPieces (side) {
    this.pawns = Array(8).fill(new ChessPiece(ChessConstants.CHESS_PIECE_PAWN, side));
    this.rooks = Array(2).fill(new ChessPiece(ChessConstants.CHESS_PIECE_ROOK, side));
    this.knights = Array(2).fill(new ChessPiece(ChessConstants.CHESS_PIECE_KNIGHT, side));
    this.bishops = Array(2).fill(new ChessPiece(ChessConstants.CHESS_PIECE_BISHOP, side));
    this.queen = new ChessPiece(ChessConstants.CHESS_PIECE_QUEEN, side);
    this.king = new ChessPiece(ChessConstants.CHESS_PIECE_KING, side);

    this.all = [].concat(this.pawns, this.rooks, this.knights, this.bishops, this.queen, this.king);
}

export default class ChessBoard {

    whitePieces = {}
    blackPieces = {}

    constructor() {
        this.init();
        this.resetBoard();
    }

    init() {
        initChessPieces.bind(this.whitePieces)(ChessConstants.CHESS_SIDE_WHITE);
        initChessPieces.bind(this.blackPieces)(ChessConstants.CHESS_SIDE_BLACK);
    }

    resetBoard() {

    }

}