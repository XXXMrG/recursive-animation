import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Fibonacci from './fibonacci';
import Hanoi from './hanoi';
import styles from './index.module.css';
import fibJpg from '../../assets/fib.jpg';
import hanoiJpg from '../../assets/hanoi.jpg';

const ResponsiveGridLayout = WidthProvider(Responsive);
const layout = {
  lg: [
    { i: 'fib', x: 1.75, y: 0, w: 4, h: 4.5, static: true },
    { i: 'hanoi', x: 6.25, y: 0, w: 4, h: 4.5, static: true },
  ],
};

function Example() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const { path, url } = useRouteMatch();
  return (
    <div style={{ boxSizing: 'border-box' }}>
      <Switch>
        <Route exact path={path}>
          <ResponsiveGridLayout
            layouts={layout}
            className="layout"
            rowHeight={100}
            autoSize={true}
            containerPadding={[10, 25]}
          >
            <div key="fib">
              <div className={`${styles.item} zi-card`}>
                <div className={styles.imgLink}>
                  <Link to={`${url}/fibonacci`}>
                    <img src={fibJpg}></img>
                  </Link>
                </div>
                <div className={styles.description}>
                  <h2 style={{ width: '100%' }}>Fibonacci</h2>
                  <p>
                    比萨的列奥纳多提出的兔子问题；
                    <br />
                    通过执行树来领略计算机科学中的递归的魅力
                  </p>
                </div>
              </div>
            </div>
            <div key="hanoi">
              <div className={`${styles.item} zi-card`}>
                <div className={styles.imgLink}>
                  <Link to={`${url}/hanoi`}>
                    <img src={hanoiJpg}></img>
                  </Link>
                </div>
                <div className={styles.description}>
                  <h2 style={{ width: '100%' }}>Tower of Hanoi</h2>
                  <p>
                    传说当金盘移动完毕，世界就会灭亡。
                    <br />
                    通过动画来模拟汉诺塔问题的解决过程。
                  </p>
                </div>
              </div>
            </div>
          </ResponsiveGridLayout>
        </Route>
        <Route path={`${path}/fibonacci`}>
          <Fibonacci />
        </Route>
        <Route path={`${path}/hanoi`}>
          <Hanoi />
        </Route>
      </Switch>
    </div>
  );
}

export default Example;
