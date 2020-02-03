import React from 'react';
import { useRef, useEffect } from 'react';
import Ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver.js';
import './component.css';

const AceComponent = () => {
  const Editor = useRef(null);
  const code = `function foo() {
    somecode();
    const num = 100;
    return num;
  }`;
  useEffect(() => {
    Ace.require('ace/ext/language_tools');
    let aceInstance = Ace.edit(Editor.current);
    aceInstance.session.setMode('ace/mode/javascript');
    aceInstance.setTheme('ace/theme/tomorrow');
    aceInstance.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
  });
  return <div className="ace-editor" ref={Editor}></div>;
};

export default AceComponent;
