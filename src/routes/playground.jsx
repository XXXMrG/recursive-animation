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
import { Text, Display, Code, useToasts } from '@zeit-ui/react';

const pages = getPGTips().map((value, index) => withAnimation(value, index));

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'code', x: 1, y: 0, w: 5, h: 6, static: true },
    { i: 'table', x: 6.5, y: 0, w: 5, h: 6, static: true },
    { i: 'stack', x: 1, y: 6.5, w: 6, h: 6, static: true },
    { i: 'console', x: 7.5, y: 6.5, w: 4, h: 6, static: true },
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
  const [result, setResult] = useState('');
  const [target, setTarget] = useState('');
  const [open, setOpen] = useState(false);
  const [, setToasts] = useToasts();
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
    // clear console log.
    setResult('');
    // only parse static error
    const { transCode, error: staticError } = await astWorker.getTransform(
      code,
      target
    );
    // execute error in there
    const { stack, params, error: exeError, result } = await astWorker.exeCode(
      transCode
    );
    console.log(transCode);
    setStackInfo(stack);
    setParamsInfo(params);
    staticError && setGlobalError(`${staticError}`);
    exeError && setGlobalError(`${exeError}`);
    result && setResult(JSON.stringify(result, null, '  '));
  };

  const setGlobalError = error => {
    setToasts({
      text: '代码执行存在异常，检查输出控制台来查看错误信息',
      type: 'error',
    });
    setResult(error);
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
        <div key="code">
          <div className={styles.description}>
            <Text h3>Show me your code</Text>
          </div>
          <div className={`zi-card ${styles.card}`}>
            <div className={styles.control}>
              <div className="zi-select-container">
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
              <div
                className={`zi-btn primary ${styles.items}`}
                onClick={handleRun}
              >
                RUN
              </div>
              <div
                className={`zi-btn success ${styles.items}`}
                onClick={() => {
                  setOpen(true);
                }}
              >
                TIPS
              </div>
            </div>
            <div className={styles.code}>
              <Ace onChange={data => setCode(data)} onError={handleError} />
            </div>
          </div>
        </div>
        <div key="table">
          <div className={styles.description}>
            <Text h3>Check execution stack </Text>
          </div>
          <div className={`zi-card ${styles.overflow}`}>
            <Table columns={columns} data={stackInfo} />
          </div>
        </div>
        <div key="stack">
          <div className={styles.description}>
            <Text h3>Recursive Stack Animation</Text>
          </div>
          <div className={`zi-card ${styles.stackCard}`}>
            <Stack data={stackInfo} />
          </div>
        </div>
        <div key="console">
          <div className={styles.description}>
            <Text h3>Console Logs</Text>
          </div>
          <div className={`zi-card ${styles.consoleCard}`}>
            <Display
              caption={
                <div>
                  <p>输出控制台</p>
                  <p>
                    系统会自动检测输入代码的返回值作为控制台输出，保证输出正确的最好方式是将要输出的函数调用放在输入代码的末尾。
                  </p>
                  <p>
                    可以在代码中直接使用<Code>console.log</Code>
                    作为中间输出方式，打开浏览器控制台来查看这些输出。
                  </p>
                </div>
              }
            >
              <Code block>{result}</Code>
            </Display>
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
