import { range } from 'lodash';

export type CellPosition = {
    row: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
};

export type ChessName = 'BISHOP' | 'KING' | 'KNIGHT' | 'PAWN' | 'QUEEN' | 'ROOK';
export type ChessSide = 'BLACK' | 'WHITE';

export class ChessPiece {
    public constructor(public side: ChessSide, public name: ChessName) { }

    public getPossibleMoves(): CellPosition[] {
        // TODO: implement
        return [];
    }
}

export class ChessBoard {
    public pieces: ChessPiece[]
    public cells: {[R in CellPosition['row']]: {[C in CellPosition['col']]: ChessPiece | undefined } }

    public resetPositions() {
        const firstRow: CellPosition['row'] = '1';
        const lastRow: CellPosition['row'] = '8';
        const rows = range(firstRow.charCodeAt(0), lastRow.charCodeAt(0)).map(c => String.fromCharCode(c)) as CellPosition['row'][];

        const firstCol: CellPosition['col'] = 'A';
        const lastCol: CellPosition['col'] = 'H';
        const cols = range(firstCol.charCodeAt(0), lastCol.charCodeAt(0)).map(c => String.fromCharCode(c)) as CellPosition['col'][];

        for (let row of rows) {
            this.cells[row] = { A: undefined, B: undefined, C: undefined, D: undefined, E: undefined, F: undefined, G: undefined, H: undefined }
        }

        for (let col of cols) {
            this.cells['2'][col] = new ChessPiece('WHITE', 'PAWN');
            this.cells['7'][col] = new ChessPiece('BLACK', 'PAWN');
        }

        this.cells['1']['A'] = new ChessPiece('WHITE', 'ROOK');
        this.cells['1']['H'] = new ChessPiece('WHITE', 'ROOK');
        this.cells['8']['A'] = new ChessPiece('BLACK', 'ROOK');
        this.cells['8']['H'] = new ChessPiece('BLACK', 'ROOK');

        this.cells['1']['B'] = new ChessPiece('WHITE', 'KNIGHT');
        this.cells['1']['G'] = new ChessPiece('WHITE', 'KNIGHT');
        this.cells['8']['B'] = new ChessPiece('BLACK', 'KNIGHT');
        this.cells['8']['G'] = new ChessPiece('BLACK', 'KNIGHT');

        this.cells['1']['C'] = new ChessPiece('WHITE', 'BISHOP');
        this.cells['1']['F'] = new ChessPiece('WHITE', 'BISHOP');
        this.cells['8']['C'] = new ChessPiece('BLACK', 'BISHOP');
        this.cells['8']['F'] = new ChessPiece('BLACK', 'BISHOP');

        this.cells['1']['D'] = new ChessPiece('WHITE', 'QUEEN');
        this.cells['8']['D'] = new ChessPiece('BLACK', 'QUEEN');
        this.cells['1']['E'] = new ChessPiece('WHITE', 'KING');
        this.cells['8']['E'] = new ChessPiece('BLACK', 'KING');
    }

    public constructor() {
        this.resetPositions();
    }
}