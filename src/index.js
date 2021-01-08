import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './calculator';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div id="pai">
         <Calculator />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

