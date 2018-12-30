import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/popper.js/dist/esm/popper'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
// not a good idea but much better
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
