import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import logo from './logo.svg';
import Index from './app';
import Ace from './ace';
import styles from './index.module.css';
import Example from './examples';
import { getScrollTop } from '../util/scroll';
const App = () => {
  const headLayout = [
    { i: 'logo', x: 0, y: 0.25, w: 1, h: 1.5, static: true },
    { i: 'title', x: 1, y: 0, w: 2, h: 2, static: true },
    { i: '1', x: 4, y: 0, w: 1, h: 2, static: true },
    { i: '2', x: 5.5, y: 0, w: 1, h: 2, static: true },
    { i: '3', x: 7, y: 0, w: 1, h: 2, static: true },
  ];

  const headRef = useRef(null);

  useEffect(() => {
    const headNode = headRef.current;
    window.addEventListener('scroll', () => {
      if (headNode.offsetHeight > getScrollTop()) {
        headNode.classList.remove(styles.sticky);
        // console.log(headNode.className);
      } else {
        headNode.classList.add(styles.sticky);
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.header} ref={headRef}>
        <GridLayout
          compactType="horizontal"
          className="layout"
          layout={headLayout}
          cols={12}
          rowHeight={30}
          width={1200}
          margin={[20, 0]}
        >
          <div key="logo" className={styles.logobox}>
            <img src={logo} className={styles.logo}></img>
          </div>
          <div key="title">
            <p className={styles.title}>Recursive Animtation</p>
          </div>
          <div key="1">
            <div className={styles.itemLink}>
              <a className={styles.link} href="#">
                Guide
              </a>
            </div>
          </div>
          <div key="2">
            <div className={styles.itemLink}>
              <a className={styles.link} href="#">
                Examples
              </a>
            </div>
          </div>
          <div key="3">
            <div className={styles.itemLink}>
              <a className={styles.link} href="#">
                Playground
              </a>
            </div>
          </div>
        </GridLayout>
      </div>

      <Router>
        <Switch>
          <Route exact path="/ace">
            <Ace />
          </Route>
          <Route path="/examples">
            <Example />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
