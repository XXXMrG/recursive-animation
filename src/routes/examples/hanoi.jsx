import React from 'react';
import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import HanoiAnime from '../../components/HanoiAnime';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  lg: [
    { i: 'canvas', x: 3, y: 1, w: 6, h: 4, static: true },
    { i: 'run', x: 5, y: 0, w: 2, h: 0.5, static: true },
    { i: 'select', x: 3, y: 0, w: 2, h: 0.5, static: true },
    { i: 'moves', x: 8, y: 0, w: 1, h: 0.5, static: true },
  ],
};

const Hanoi = () => {
  const [run, setRun] = useState(false);
  const [diskNumber, setDiskNumber] = useState(3);
  const [moves, setMoves] = useState(0);
  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="canvas" style={{ padding: 0 }}>
        <div className="zi-card" style={{ width: '100%', height: '100%' }}>
          <HanoiAnime isRun={run} disks={diskNumber} getMoves={setMoves} />
        </div>
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
      <div key="select">
        <div className="zi-select-container">
          <select
            className="zi-select"
            value={diskNumber}
            onChange={e => {
              setDiskNumber(e.target.value);
              // to replay animation.
              setRun(false);
              setMoves(0);
            }}
          >
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
          <i className="arrow zi-icon-up"></i>
        </div>
      </div>
      <div key="moves">
        <div className="zi-card" style={{ width: '100%', height: '100%' }}>
          Moves:{moves}
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Hanoi;
