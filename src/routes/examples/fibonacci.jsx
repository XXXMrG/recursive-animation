import React from 'react';
import { useEffect, useState } from 'react';
import styles from './fibonacci.module.css';
import Fibtree from '../../components/Fibtree';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../../components/Ace';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Fibonacci = () => {
  const [code, setCode] = useState('');
  const defaultValue = `function function_name(argument) {
    // body...
}`;
  const layout = {
    lg: [
      { i: 'canvas', x: 6, y: 0, w: 4.5, h: 4.5, isResizable: false },
      { i: 'editor', x: 0, y: 0, w: 5, h: 6, static: true },
    ],
  };
  useEffect(() => {
    console.log(code);
  });
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="canvas" className="zi-card" style={{ padding: 0 }}>
        <div className={styles.card}>
          <Fibtree number={5} />
        </div>
      </div>

      <div key="editor" className="zi-card zi-dark" style={{ padding: '1px' }}>
        <div className={styles.card}>
          <Ace onChange={setCode} defaultValue={defaultValue} />
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Fibonacci;
