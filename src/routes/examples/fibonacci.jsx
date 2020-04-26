import React from 'react';
import { useEffect, useState } from 'react';
import styles from './fibonacci.module.css';
import Fibtree from '../../components/Fibtree';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../../components/Ace';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Fibonacci = () => {
  const [code, setCode] = useState('');
  const [deep, setDeep] = useState(3);
  const defaultValue = `function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    const result = fibonacci(num - 1) + fibonacci(num - 2);
    return result;
 }`;
  const layout = {
    lg: [
      { i: 'canvas', x: 6, y: 1, w: 4.5, h: 4.5, isResizable: false },
      { i: 'editor', x: 0, y: 1, w: 5, h: 3, static: true },
      { i: 'deep', x: 0, y: 0, w: 2, h: 1, static: true },
    ],
  };
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="deep">
        <div className="zi-select-container">
          <select
            className="zi-select"
            value={deep}
            onChange={e => {
              setDeep(e.target.value);
            }}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <i className="arrow zi-icon-up"></i>
        </div>
      </div>
      <div key="editor" className="zi-card zi-dark" style={{ padding: '1px' }}>
        <div className={styles.card}>
          <Ace onChange={setCode} defaultValue={defaultValue} />
        </div>
      </div>
      <div key="canvas" className="zi-card" style={{ padding: 0 }}>
        <div className={styles.card}>
          <Fibtree number={5} />
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Fibonacci;
