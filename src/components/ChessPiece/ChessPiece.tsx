import React = require('react');

type ChessPieceProps = {
    name: 'BISHOP' | 'KING' | 'KNIGHT' | 'PAWN' | 'QUEEN' | 'ROOK',
    side: 'BLACK' | 'WHITE'
};

type ChessPieceSVGs = {
    [N in ChessPieceProps['name']]: {[S in ChessPieceProps['side']]: React.StatelessComponent<any> }
};

const LoadSVGs = (): ChessPieceSVGs => {
    const ChessPieceNames: ChessPieceProps['name'][] = ['BISHOP', 'KING', 'KNIGHT', 'PAWN', 'QUEEN', 'ROOK'];
    const ChessPieceSides: ChessPieceProps['side'][] = ['BLACK', 'WHITE'];
    const SVGs: Partial<ChessPieceSVGs> = {};

    for (let name of ChessPieceNames) {
        SVGs[name] = {} as any;
        for (let side of ChessPieceSides) {
            SVGs[name][side] = require(`assets/images/${name}_${side}.svg`);
        }
    }

    return SVGs as ChessPieceSVGs;
};

const SVGs = LoadSVGs();

export class ChessPiece extends React.Component<ChessPieceProps, {}> {
    render() {
        const { name, side } = this.props;
        const Piece = SVGs[name][side];
        return <Piece style={{width: '50px'}}/>;
    }
}