import React = require('react');
import ReactDOM = require('react-dom');
import injectTapEventPlugin = require('react-tap-event-plugin');
import App from './App';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));