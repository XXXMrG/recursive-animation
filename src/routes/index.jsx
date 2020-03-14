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
  const navLayout = [
    { i: 'logo', x: 3, y: 0, w: 1, h: 2, static: true },
    { i: 'title', x: 4, y: 0, w: 4, h: 2, static: true },
  ];
  const headLayout = [
    { i: '1', x: 4, y: 0, w: 1, h: 2, static: true },
    { i: '2', x: 5.5, y: 0, w: 1, h: 2, static: true },
    { i: '3', x: 7, y: 0, w: 1, h: 2, static: true },
  ];

  const navRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const navNode = navRef.current;
    const headNode = headRef.current;
    window.addEventListener('scroll', e => {
      if (navNode.offsetHeight > getScrollTop()) {
        headNode.classList.remove(styles.sticky);
        console.log(headNode.className);
      } else {
        headNode.classList.add(styles.sticky);
      }
    });
  }, []);
  return (
    <div>
      <nav ref={navRef}>
        <GridLayout
          compactType="horizontal"
          className="layout"
          layout={navLayout}
          cols={12}
          rowHeight={15}
          width={1200}
          margin={[20, 5]}
        >
          <div key="logo" className={styles.logobox}>
            <img src={logo} className={styles.logo}></img>
          </div>
          <div className={styles.item} key="title">
            Recursive Animtation
          </div>
        </GridLayout>
      </nav>
      <div className={styles.header} ref={headRef}>
        <GridLayout
          compactType="horizontal"
          className="layout"
          layout={headLayout}
          cols={12}
          rowHeight={20}
          width={1200}
          margin={[20, 0]}
        >
          <div className={styles.itemLink} key="1"></div>
          <div className={styles.itemLink} key="2"></div>
          <div className={styles.itemLink} key="3"></div>
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
