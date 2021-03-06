import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import HanoiAnime from '../../components/HanoiAnime';
import styles from './hanoi.module.css';
import Table from '../../components/Table';
import ModelWithPage from '../../components/ModelWithPage';
import withAnimation from '../../hoc/withAnimation';
import { getHanoiTips } from '../../util/makeTips';
import Stack from '../../components/Stack';
import Ace from '../../components/Ace';
import { Text, Select } from '@zeit-ui/react';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  lg: [
    { i: 'canvas', x: 1, y: 0, w: 6, h: 4, static: true },
    { i: 'stack', x: 1, y: 5, w: 6, h: 6, static: true },
    { i: 'code', x: 7.5, y: 0, w: 4, h: 3, static: true },
    { i: 'table', x: 7.5, y: 5, w: 4, h: 7, static: true },
  ],
};

const pages = getHanoiTips().map((value, index) => withAnimation(value, index));

const Hanoi = () => {
  const [run, setRun] = useState(false);
  const [diskNumber, setDiskNumber] = useState('3');
  const [moves, setMoves] = useState(0);
  const [open, setOpen] = useState(false);
  const [stack, setStack] = useState({ data: [], loading: false });
  const defaultValue = `function hanoi (deep, A, B, C) {
  if (deep === 0) {
    return;
  }
  hanoi(deep - 1, A, C, B);
  console.log('move disk deep from A to C')
  hanoi(deep - 1, B, A , C);
}`;
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
        <div key="canvas" style={{ padding: 0 }}>
          <div className={styles.title}>
            <Text h3>选择汉诺塔层数并执行</Text>
            <Select
              value={diskNumber}
              onChange={value => {
                setDiskNumber(value);
                // to replay animation.
                setRun(false);
                setMoves(0);
              }}
            >
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
              <Select.Option value="6">6</Select.Option>
              <Select.Option value="7">7</Select.Option>
              <Select.Option value="8">8</Select.Option>
            </Select>
            <div
              className="zi-btn primary auto"
              onClick={() => {
                setRun(true);
              }}
            >
              Run
            </div>
            <div className="zi-card">Moves:{moves}</div>
            <div
              className="zi-btn success auto"
              onClick={() => {
                setOpen(true);
              }}
            >
              Tips
            </div>
          </div>
          <div className={`zi-card ${styles.card}`}>
            <HanoiAnime
              isRun={run}
              disks={parseInt(diskNumber, 10)}
              getMoves={setMoves}
              getStack={setStack}
            />
          </div>
        </div>
        <div key="code">
          <div className={styles.title}>
            <Text h3>Check execution stack</Text>
          </div>
          <Ace defaultValue={defaultValue} options={{ readOnly: true }} />
        </div>
        <div key="stack" style={{ padding: 0 }}>
          <div className={styles.title}>
            <Text h3>Recursive Stack Animation</Text>
          </div>
          <div className={`zi-card ${styles.stackCard}`}>
            <Stack data={stack.data} />
          </div>
        </div>
        <div key="table">
          <div className={styles.title}>
            <Text h3>Check execution stack</Text>
          </div>
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
        title="如何使用？"
        subTitle="汉诺塔与递归执行栈"
      />
    </>
  );
};

export default Hanoi;
