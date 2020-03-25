import React from 'react';
import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styles from './hanoi.module.css';
import HanoiAnime from '../../components/HanoiAnime';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  lg: [
    { i: 'canvas', x: 3, y: 0, w: 6, h: 4, static: true },
    { i: 'run', x: 0, y: 0, w: 1, h: 0.5, static: true },
  ],
};

const Hanoi = () => {
  const [run, setRun] = useState(false);
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="canvas" className="zi-card" style={{ padding: 0 }}>
        <HanoiAnime isRun={run} />
      </div>
      <div key="run">
        <div
          className="zi-btn primary"
          onClick={() => {
            setRun(true);
          }}
        >
          Run
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Hanoi;
