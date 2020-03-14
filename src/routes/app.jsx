import React from 'react';
import style from './app.module.css';
import GridLayout from 'react-grid-layout';
import logo from './logo.svg';

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
  const layout = [
    { i: 'a', x: 0, y: 0, w: 4, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 4, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 4, h: 2 },
  ];
  return (
    <div className={style.App}>
      <GridLayout
        compactType="horizontal"
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        margin={[120, 20]}
      >
        <div key="a">
          <img src={logo}></img>
        </div>
        <div key="b">
          <img src={logo} className={style.logo}></img>
        </div>
        <div key="c">c</div>
      </GridLayout>
      <div className={style.editor}></div>
    </div>
  );
}

export default App;
