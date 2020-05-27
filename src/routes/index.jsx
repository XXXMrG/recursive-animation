import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React from 'react';
import { useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import logo from '../assets/logo.svg';
import Footer from '../components/Footer';
import Index from './app';
import styles from './index.module.css';
import Example from './examples';
import Ace from './ace';
import PlayGround from './playground';
import { getScrollTop } from '../util/scroll';
import ReactDomServer from 'react-dom/server';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import { ZeitProvider } from '@zeit-ui/react';

const tippyDom = (
  <Router>
    <div>
      <Link to="/examples/fibonacci" className={styles.link}>
        fibonacci
      </Link>
      <Link to="/examples/hanoi" className={styles.link}>
        Hanoi
      </Link>
    </div>
  </Router>
);

const App = () => {
  const headLayout = [
    { i: 'logo', x: 0, y: 0.25, w: 1, h: 1.5, static: true },
    { i: 'title', x: 1, y: 0, w: 3, h: 2, static: true },
    { i: '1', x: 4, y: 0, w: 1, h: 2, static: true },
    { i: '2', x: 5.5, y: 0, w: 1, h: 2, static: true },
    { i: '3', x: 7, y: 0, w: 1, h: 2, static: true },
    { i: 'github', x: 11, y: 0, w: 1, h: 2, static: true },
  ];
  const headRef = useRef(null);
  const exampleRef = useRef(null);
  // header effect
  useEffect(() => {
    const headNode = headRef.current;
    const exampleNode = exampleRef.current;
    window.addEventListener('scroll', () => {
      if (headNode.offsetHeight > getScrollTop()) {
        headNode.classList.remove(styles.sticky);
      } else {
        headNode.classList.add(styles.sticky);
      }
    });
    // use ssr method get jsx html string
    const tippyHtml = ReactDomServer.renderToStaticMarkup(tippyDom);
    tippy(exampleNode, {
      interactive: true,
      placement: 'bottom',
      content: tippyHtml,
      theme: 'light',
      distance: 20,
      arrow: false,
      allowHTML: true,
    });
  }, []);
  return (
    <ZeitProvider>
      <Router>
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
                <Link className={styles.link} to="/">
                  Guide
                </Link>
              </div>
            </div>
            <div key="2">
              <div className={styles.itemLink}>
                <Link className={styles.link} to="/examples" ref={exampleRef}>
                  Examples
                </Link>
              </div>
            </div>
            <div key="3">
              <div className={styles.itemLink}>
                <Link className={styles.link} to="/playground">
                  Playground
                </Link>
              </div>
            </div>
            <div key="github">
              <div className={styles.github}>
                <a
                  href="https://github.com/XXXMrG/recursive-animation"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label="Project-GitHub"
                  className={styles.link}
                  style={{ fontSize: '1rem' }}
                >
                  <i
                    className="zi-icon-github"
                    style={{ fontSize: '2rem', marginRight: '5px' }}
                  ></i>
                  GitHub
                </a>
              </div>
            </div>
          </GridLayout>
        </div>
        <div className={styles.main}>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route exact path="/ace">
              <Ace />
            </Route>
            <Route exact path="/playground">
              <PlayGround />
            </Route>
            <Route path="/examples">
              <Example />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </ZeitProvider>
  );
};

export default App;
