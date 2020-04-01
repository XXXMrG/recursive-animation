import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../components/Ace';
import styles from './playground.module.css';
import { useState, useEffect } from 'react';
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'code', x: 1, y: 1, w: 4.5, h: 5, static: true },
    { i: 'ast', x: 6.5, y: 1, w: 5.5, h: 5, static: true },
    { i: 'run', x: 5, y: 0, w: 2, h: 1, static: true },
  ],
};
const PlayGround = () => {
  const [code, setCode] = useState('');
  const [ast, setAst] = useState('');
  const handleRun = () => {
    try {
      let astString = parse(code);
      console.log(astString.program.body);
      setAst(JSON.stringify(astString, null, '  '));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="code">
        <div className={`zi-card zi-dark ${styles.card}`}>
          <Ace onChange={setCode} />
        </div>
      </div>
      <div key="ast">
        <div className={`${styles.card} zi-card`}>
          <Ace
            options={{ theme: 'ace/theme/xcode', readOnly: true }}
            value={ast}
          />
        </div>
      </div>
      <div key="run">
        <div className="zi-btn" onClick={handleRun}>
          RUN
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default PlayGround;
