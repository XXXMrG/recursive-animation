import React from 'react';
import style from './app.module.css';

function App() {
  const config = {
    height: 500,
    width: 500,
    value: `function foo() {
  somecode();
  const num = 100;
  return num;
}`,
  };
  return (
    <div className={style.App}>
      <div className={`zi-card ${style.editor}`}></div>
    </div>
  );
}

export default App;
