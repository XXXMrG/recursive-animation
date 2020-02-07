import React from 'react';
import Ace from '../../components/Ace';
import { useRef, useEffect, useState } from 'react';
import style from './ace.module.css';

function AceEditor() {
  const code = useRef(null);
  const [codeValue, setCodeValue] = useState('');
  const handleClick = () => {
    const node = code.current.contentWindow.document;
    node.open();
    const codeString = editorRef.session.getValue();
    node.write(`<script>${codeString}</script>`);
    node.close();
  };
  let editorRef = null;
  const setRef = instance => {
    editorRef = instance;
  };
  return (
    <div className={style.App}>
      <div className={style.Ace}>
        <Ace value={codeValue} getRef={setRef} />
        <button className={style.run} onClick={handleClick}>
          RUN CODE
        </button>
      </div>
      <iframe className={style.code} ref={code}></iframe>
    </div>
  );
}

export default AceEditor;
