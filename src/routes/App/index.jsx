import React from 'react';
import logo from './logo.svg';
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
    <React.Fragment>
      <header className={style.header}>
        <img src={logo} className={style.logo} alt="logo" />
      </header>
      <div className={style.App}>
        <div className={style.editor}></div>
      </div>
    </React.Fragment>
  );
}

export default App;
