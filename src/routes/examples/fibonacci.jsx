import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import styles from './fibonacci.module.css';
import Fibtree from '../../components/Fibtree';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../../components/Ace';
import Table from '../../components/Table';
import Stack from '../../components/Stack';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Fibonacci = () => {
  const [deep, setDeep] = useState(3);
  const [stack, setStack] = useState({ data: [], loading: false });
  const defaultValue = `function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    const result = fibonacci(num - 1) + fibonacci(num - 2);
    return result;
 }`;
  const layout = {
    lg: [
      { i: 'canvas', x: 1.75, y: 0, w: 4.5, h: 4.5, static: true },
      { i: 'stack', x: 1, y: 5, w: 6, h: 5, static: true },
      { i: 'editor', x: 6.5, y: 0, w: 5, h: 3, static: true },
      { i: 'table', x: 7.5, y: 3.5, w: 4, h: 6, static: true },
      { i: 'deep', x: 0, y: 0, w: 1, h: 1, static: true },
    ],
  };
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
        columns: [{ Header: 'number', accessor: 'number' }],
      },
    ],
    []
  );
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
              setDeep(parseInt(e.target.value, 10));
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
          <Ace defaultValue={defaultValue} options={{ readOnly: true }} />
        </div>
      </div>
      <div key="canvas" className="zi-card" style={{ padding: 0 }}>
        <div className={styles.card}>
          <div className={styles.animation}>
            <Fibtree number={deep} getStack={setStack} />
          </div>
          <div className={styles.description}>
            <p>
              求解斐波那契数列中第 num 项过程的递归函数执行树。
              <br />
              相同颜色的节点代表着重复的函数调用，用 ⭕️标注的节点则是递归问题的
              basic case，也是递归树的叶子结点，是递归函数的出口。
            </p>
          </div>
        </div>
      </div>
      <div key="stack">
        <div className={`zi-card ${styles.card}`}>
          <Stack data={stack.data} />
        </div>
      </div>
      <div key="table">
        <div className={`zi-card ${styles.table}`}>
          <Table columns={columns} data={stack.data} loading={stack.loading} />
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default Fibonacci;
