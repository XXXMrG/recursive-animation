import React from 'react';
import { useState, useMemo } from 'react';
import styles from './fibonacci.module.css';
import Fibtree from '../../components/Fibtree';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Ace from '../../components/Ace';
import Table from '../../components/Table';
import Stack from '../../components/Stack';
import { Select, Text, Button } from '@zeit-ui/react';
import ModelWithPage from '../../components/ModelWithPage';
import { getFibTips } from '../../util/makeTips';
import withAnimation from '../../hoc/withAnimation';

const pages = getFibTips().map((value, index) => withAnimation(value, index));
const ResponsiveGridLayout = WidthProvider(Responsive);

const Fibonacci = () => {
  const [deep, setDeep] = useState('3');
  const [stack, setStack] = useState({ data: [], loading: false });
  const [open, setOpen] = useState(true);
  const defaultValue = `function fibonacci(num) {
    if (num <= 1) {
        return num;
    }
    const result = fibonacci(num - 1) + fibonacci(num - 2);
    return result;
}`;
  const layout = {
    lg: [
      { i: 'canvas', x: 1, y: 0, w: 4.5, h: 5, static: true },
      { i: 'stack', x: 1, y: 6, w: 6, h: 6, static: true },
      { i: 'editor', x: 6.5, y: 0, w: 5, h: 4, static: true },
      { i: 'table', x: 7.5, y: 6, w: 4, h: 7, static: true },
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
  const closeHandler = () => {
    setOpen(false);
  };
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
            <Text h3>选择问题规模来执行动画</Text>
            <div style={{ flexGrow: 1 }}></div>
            <Select
              size="large"
              value={deep}
              onChange={value => {
                setDeep(value);
              }}
            >
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="5">5</Select.Option>
            </Select>
          </div>
          <div className={`zi-card ${styles.card}`}>
            <div className={styles.animation}>
              <Fibtree number={parseInt(deep, 10)} getStack={setStack} />
            </div>
            <div className={styles.description}>
              <p>
                求解斐波那契数列中第 num 项过程的递归函数执行树。
                <br />
                相同颜色的节点代表着重复的函数调用，用圆圈标注的节点则是递归问题的
                basic case，也是递归树的叶子结点，是递归函数的出口。
              </p>
            </div>
          </div>
        </div>
        <div key="editor" style={{ padding: '1px' }}>
          <div className={styles.title}>
            <Text h3>Code</Text>
            <div style={{ flexGrow: 1 }}></div>
            <Button
              type="success"
              onClick={() => {
                setOpen(true);
              }}
            >
              Tips
            </Button>
          </div>
          <div className={styles.card}>
            <Ace defaultValue={defaultValue} options={{ readOnly: true }} />
          </div>
        </div>
        <div key="stack">
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
        title="如何使用？"
        subTitle="斐波那契问题和递归树"
        open={open}
        onClose={closeHandler}
        pages={pages}
      />
    </>
  );
};

export default Fibonacci;
