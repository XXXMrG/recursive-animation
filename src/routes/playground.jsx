import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../components/Ace';
import styles from './playground.module.css';
import { useState, useEffect } from 'react';
import * as Comlink from 'comlink';

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'code', x: 1, y: 1, w: 4.5, h: 5, static: true },
    { i: 'transform', x: 6.5, y: 1, w: 5.5, h: 5, static: true },
    { i: 'funcSelect', x: 4, y: 0, w: 1.5, h: 1, static: true },
    { i: 'run', x: 6, y: 0, w: 2, h: 1, static: true },
  ],
};
const astWorker = Comlink.wrap(
  new Worker('../util/worker.js', { type: 'module' })
);
const PlayGround = () => {
  const [code, setCode] = useState('');
  const [transform, setTransform] = useState('');
  const [funcNames, setFuncNames] = useState([]);
  const [target, setTarget] = useState('');
  const myClg = (str, func, ...params) => {
    console.log(str, func, ...params);
  };
  const handleRun = async () => {
    const { transCode } = await astWorker.getTransform(code, target);
    setTransform(transCode);
  };

  const handleError = async (data, error) => {
    // no any static error. but still have parse error
    if (error.length === 0) {
      const { funcNames } = await astWorker.getFuncNames(data);
      setFuncNames(funcNames);
    }
  };
  // target default value effect
  useEffect(() => {
    if (funcNames.length > 0) {
      target === '' && setTarget(funcNames[0]);
    }
  }, [target, funcNames]);

  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      style={{ boxSizing: 'border-box' }}
      containerPadding={[10, 25]}
    >
      <div key="funcSelect">
        <div className="zi-select-container" style={{ width: '100%' }}>
          <select
            className="zi-select"
            value={target}
            onChange={e => {
              setTarget(e.target.value);
            }}
          >
            <option disabled>choose your func target</option>
            {funcNames.map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <i className="arrow zi-icon-up"></i>
        </div>
      </div>
      <div key="run">
        <div className="zi-btn primary" onClick={handleRun}>
          RUN
        </div>
      </div>
      <div key="code">
        <div className={`zi-card zi-dark ${styles.card}`}>
          <Ace onChange={data => setCode(data)} onError={handleError} />
        </div>
      </div>
      <div key="transform">
        <div className={`${styles.card} zi-card`}>
          <Ace
            options={{ theme: 'ace/theme/xcode', readOnly: true }}
            value={transform}
          />
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default PlayGround;
