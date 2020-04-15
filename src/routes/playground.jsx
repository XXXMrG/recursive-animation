import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../components/Ace';
import styles from './playground.module.css';
import { useState, useEffect, useMemo } from 'react';
import * as Comlink from 'comlink';
import Table from '../components/Table';

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'code', x: 1, y: 1, w: 4.5, h: 5, static: true },
    { i: 'transform', x: 6.5, y: 1, w: 5.5, h: 5, minH: 2, maxH: 8 },
    { i: 'funcSelect', x: 4, y: 0, w: 1.5, h: 1, static: true },
    { i: 'run', x: 6, y: 0, w: 2, h: 1, static: true },
  ],
};
const astWorker = Comlink.wrap(
  new Worker('../util/worker.js', { type: 'module' })
);
const PlayGround = () => {
  const [code, setCode] = useState('');
  const [stackInfo, setStackInfo] = useState([]);
  const [paramsInfo, setParamsInfo] = useState([]);
  const [funcNames, setFuncNames] = useState([]);
  const [target, setTarget] = useState('');
  const columns = useMemo(
    () => [
      {
        Header: 'STACK',
        columns: [
          { Header: '堆栈动作', accessor: 'status' },
          { Header: '函数名', accessor: 'funcName' },
        ],
      },
      {
        Header: 'PARAMS',
        columns:
          paramsInfo.length > 0
            ? paramsInfo.map(value => ({
                Header: value,
                accessor: value,
              }))
            : [{ Header: '函数参数列表' }],
      },
    ],
    [paramsInfo]
  );
  const handleRun = async () => {
    // only parse static error
    const { transCode, error: staticError } = await astWorker.getTransform(
      code,
      target
    );
    // execute error in there
    const { stack, params, error: exeError } = await astWorker.exeCode(
      transCode
    );
    console.log(transCode);
    console.log(staticError);
    console.log(stack);
    console.log(exeError);
    setStackInfo(stack);
    setParamsInfo(params);
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
      setTarget(funcNames[0]);
    }
  }, [funcNames]);

  return (
    <ResponsiveGridLayout
      layouts={layout}
      className="layout"
      rowHeight={100}
      autoSize={true}
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
        <div className={`zi-card ${styles.overflow}`}>
          <Table columns={columns} data={stackInfo} />
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default PlayGround;
