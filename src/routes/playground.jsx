import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../components/Ace';
import styles from './playground.module.css';
import { useState, useEffect, useMemo } from 'react';
import * as Comlink from 'comlink';
import Table from '../components/Table';
import ModelWithPage from '../components/ModelWithPage';
import Stack from '../components/Stack';
import withAnimation from '../hoc/withAnimation';
import { getPGTips } from '../util/makeTips';
//import Worker from '../util/ast.worker.js';

const pages = getPGTips().map((value, index) => withAnimation(value, index));

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'code', x: 1, y: 1, w: 4.5, h: 5, static: true },
    { i: 'stack', x: 3, y: 6.5, w: 6, h: 5, static: true },
    { i: 'table', x: 6.5, y: 1, w: 5.5, h: 5, static: true },
    { i: 'funcSelect', x: 4, y: 0, w: 1.5, h: 1, static: true },
    { i: 'run', x: 6, y: 0, w: 2, h: 1, static: true },
    { i: 'tips', x: 8, y: 0, w: 2, h: 1, static: true },
  ],
};
//
const astWorker = Comlink.wrap(
  new Worker('../util/ast.worker.js', { type: 'module' })
);
const PlayGround = () => {
  const [code, setCode] = useState('');
  const [stackInfo, setStackInfo] = useState([]);
  const [paramsInfo, setParamsInfo] = useState([]);
  const [funcNames, setFuncNames] = useState([]);
  const [target, setTarget] = useState('');
  const [open, setOpen] = useState(false);
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
    // TODO: add error tips.
    // no any static error. but still have parse error
    if (error.length === 0) {
      const { funcNames } = await astWorker.getFuncNames(data);
      setFuncNames(funcNames);
    }
  };

  const closeHandler = () => {
    setOpen(false);
  };
  // target default value effect
  useEffect(() => {
    if (funcNames.length > 0) {
      setTarget(funcNames[0]);
    }
  }, [funcNames]);
  //init effect
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
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
        <div key="tips">
          <div
            className="zi-btn success"
            onClick={() => {
              setOpen(true);
            }}
          >
            TIPS
          </div>
        </div>
        <div key="code">
          <div className={`zi-card zi-dark ${styles.card}`}>
            <Ace onChange={data => setCode(data)} onError={handleError} />
          </div>
        </div>
        <div key="table">
          <div className={`zi-card ${styles.overflow}`}>
            <Table columns={columns} data={stackInfo} />
          </div>
        </div>
        <div key="stack">
          <div className={`zi-card ${styles.card}`}>
            <Stack data={stackInfo} />
          </div>
        </div>
      </ResponsiveGridLayout>
      <ModelWithPage
        title="如何使用？"
        subTitle="查看递归函数的执行过程"
        open={open}
        onClose={closeHandler}
        pages={pages}
      />
    </>
  );
};

export default PlayGround;
