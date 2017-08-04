import React = require('react');
import { ChessName, ChessSide, allChessName, allChessSide } from 'logic';

type ChessPieceProps = {
    name: ChessName,
    side: ChessSide
};

type ChessPieceSVGs = {
    [name: string]: { [side: string]: React.StatelessComponent<{ style: React.CSSProperties }> }
};

const LoadSVGs = (): ChessPieceSVGs => {
    const SVGs: Partial<ChessPieceSVGs> = {};

    for (let name of allChessName) {
        SVGs[name] = {};
        for (let side of allChessSide) {
            (SVGs[name] as any)[side] = require(`assets/images/${name}_${side}.svg`);
        }
    }

    return SVGs as ChessPieceSVGs;
};

const allChessPiecesSVG = LoadSVGs();

export class ChessPiece extends React.Component<ChessPieceProps> {
    render() {
        const { name, side } = this.props;
        const Piece = allChessPiecesSVG[name][side];
        return <Piece style={{ width: '50px' }} />;
    }
}