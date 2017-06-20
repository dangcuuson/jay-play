import React = require('react');
import { ChessPiece } from 'components';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ChessPiece name={'BISHOP'} side={'BLACK'}/>
    );
  }
}

export default App;
