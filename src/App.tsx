import React = require('react');
import { abc } from 'components/testComponent';
class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        {abc}
      </div>
    );
  }
}

export default App;
