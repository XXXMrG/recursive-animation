import React from 'react';
import { useMemo } from 'react';
import styles from './app.module.css';
import logo from '../assets/logo.svg';

function App() {
  const titles = [
    {
      title: 'learn recursive program',
      delay: '1ms',
    },
    { title: 'make recursive function move', delay: '4s' },
    { title: 'check recursive stack', delay: '8s' },
    { title: 'monitor all params', delay: '12s' },
  ];
  const slogans = useMemo(
    () =>
      titles.map((value, index) => (
        <span
          key={`title-${index}`}
          style={{ animationDelay: value.delay }}
          className={styles.items}
        >
          {value.title}
        </span>
      )),
    [titles]
  );
  return (
    <div className={styles.App}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.header}>
            <img src={logo} className={styles.logo}></img>
            <h1 style={{ color: '#696969' }}>Recursive Animation</h1>
          </div>
          <h1 style={{ margin: 0 }}>The visualization system to</h1>
          <h2 className={styles.title2}>
            <div className={styles.slider}>
              <div className={styles.words}>{slogans}</div>
            </div>
          </h2>
          <div className={styles.buttons}>
            <div>
              <a href="/playground" className={`zi-btn success ${styles.btn}`}>
                PlayGround
              </a>
            </div>
            <div>
              <a href="/examples" className={`zi-btn ${styles.btn}`}>
                Show Examples
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
