import React = require('react');
import { ChessBoard } from 'components/ChessBoard';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ChessBoard/>
    );
  }
}

export default App;
