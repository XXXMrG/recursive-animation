import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styles from './hanoi.module.css';
import HanoiAnime from '../../components/HanoiAnime';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  lg: [{ i: 'canvas', x: 3, y: 0, w: 6, h: 4, static: true }],
};

const Hanoi = () => {
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="canvas" className="zi-card" style={{ padding: 0 }}>
        <HanoiAnime />
      </div>
    </ResponsiveGridLayout>
  );
};

export default Hanoi;
