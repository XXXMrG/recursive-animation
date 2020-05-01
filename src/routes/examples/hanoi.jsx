import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import HanoiAnime from '../../components/HanoiAnime';
import styles from './hanoi.module.css';
import Table from '../../components/Table';
import ModelWithPage from '../../components/ModelWithPage';
import withAnimation from '../../hoc/withAnimation';
import { getHanoiTips } from '../../util/makeTips';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  lg: [
    { i: 'canvas', x: 1, y: 1, w: 6, h: 4, static: true },
    { i: 'run', x: 3, y: 0, w: 2, h: 0.5, static: true },
    { i: 'select', x: 1, y: 0, w: 2, h: 0.5, static: true },
    { i: 'moves', x: 6, y: 0, w: 1, h: 0.5, static: true },
    { i: 'table', x: 7.5, y: 0, w: 4, h: 6, static: true },
  ],
};

const pages = getHanoiTips().map((value, index) => withAnimation(value, index));

const Hanoi = () => {
  const [run, setRun] = useState(false);
  const [diskNumber, setDiskNumber] = useState(3);
  const [moves, setMoves] = useState(0);
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState({ data: [], loading: false });
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
        columns: [
          { Header: 'deep', accessor: 'deep' },
          { Header: 'from', accessor: 'from' },
          { Header: 'cache', accessor: 'cache' },
          { Header: 'to', accessor: 'to' },
        ],
      },
    ],
    []
  );
  const closeHandler = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <ResponsiveGridLayout
        layouts={layout}
        className="layout"
        rowHeight={100}
        style={{ boxSizing: 'border-box' }}
        containerPadding={[10, 25]}
      >
        <div key="run">
          <div
            className="zi-btn primary"
            onClick={() => {
              setRun(true);
            }}
          >
            Run
          </div>
          <div
            className="zi-btn primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            open
          </div>
        </div>
        <div key="select">
          <div className="zi-select-container">
            <select
              className="zi-select"
              value={diskNumber}
              onChange={e => {
                setDiskNumber(parseInt(e.target.value, 10));
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
          <div className={`zi-card ${styles.card}`}>Moves:{moves}</div>
        </div>
        <div key="canvas" style={{ padding: 0 }}>
          <div className={`zi-card ${styles.card}`}>
            <HanoiAnime
              isRun={run}
              disks={diskNumber}
              getMoves={setMoves}
              getStack={setStack}
            />
          </div>
        </div>
        <div key="table">
          <div className={`zi-card ${styles.table}`}>
            <Table
              columns={columns}
              data={stack.data}
              loading={stack.loading}
            />
          </div>
        </div>
      </ResponsiveGridLayout>
      <ModelWithPage
        open={open}
        onClose={closeHandler}
        pages={pages}
        current={0}
        title="如何使用？"
        subTitle="汉诺塔与递归执行树"
      />
    </>
  );
};

export default Hanoi;
