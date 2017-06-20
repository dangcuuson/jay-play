import React = require('react');
import { ChessPiece } from 'components';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <ChessPiece name={'BISHOP'} side={'BLACK'}/>
        <ChessPiece name={'BISHOP'} side={'WHITE'}/>
        <ChessPiece name={'KING'} side={'BLACK'}/>
        <ChessPiece name={'KING'} side={'WHITE'}/>
        <ChessPiece name={'KNIGHT'} side={'BLACK'}/>
        <ChessPiece name={'KNIGHT'} side={'WHITE'}/>
        <ChessPiece name={'PAWN'} side={'BLACK'}/>
        <ChessPiece name={'PAWN'} side={'WHITE'}/>
        <ChessPiece name={'QUEEN'} side={'BLACK'}/>
        <ChessPiece name={'QUEEN'} side={'WHITE'}/>
        <ChessPiece name={'ROOK'} side={'BLACK'}/>
        <ChessPiece name={'ROOK'} side={'WHITE'}/>
      </div>
    );
  }
}

export default App;
