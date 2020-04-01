import React from 'react';
import Ace from '../components/Ace';
import { useRef, useEffect, useState } from 'react';
import style from './ace.module.css';

function AceEditor() {
  const code = useRef(null);
  const [codeValue, setCodeValue] = useState('');
  // iframe src in the public folder
  // the iframe document have some proxy function
  const handleClick = () => {
    const node = code.current.contentWindow;
    let codeString = codeValue;
    const consoleReg = /(^.|\b)console\.(\S+)/g;
    codeString = codeString.replace(consoleReg, (all, blank, exe) => {
      return `proxyConsole.${exe}`;
    });
    try {
      node.eval(codeString);
    } catch (e) {
      node.eval(`outputError(${JSON.stringify(e.message)})`);
    }
  };

  return (
    <div className={style.App}>
      <div className={style.Ace}>
        <Ace onChange={setCodeValue} />
        <button className={style.run} onClick={handleClick}>
          RUN CODE
        </button>
      </div>
      <iframe className={style.code} ref={code} src="./iframe.html"></iframe>
    </div>
  );
}

export default AceEditor;
