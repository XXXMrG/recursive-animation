import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes';
import * as serviceWorker from './serviceWorker';
import '@zeit-ui/style';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
