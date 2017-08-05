import React = require('react');
import { TouchTapEventHandler } from 'material-ui';
export { };

// https://github.com/zilverline/react-tap-event-plugin/issues/58 (ptitmouton)
declare module 'react' {
    interface DOMAttributes<T> {
        onTouchTap?: TouchTapEventHandler;
    }
}