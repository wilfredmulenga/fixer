/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
// not a good idea but much better
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
