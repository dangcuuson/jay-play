import React = require('react');
import { ChessBoard } from 'components';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <ChessBoard />
      </div>
    );
  }
}

export default App;
