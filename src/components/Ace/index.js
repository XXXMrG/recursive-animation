import React from 'react';
import { useRef, useEffect } from 'react';
import Ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver.js';
import './component.css';

const AceComponent = props => {
  const Editor = useRef(null);
  const code = `function foo() {
    somecode();
    const num = 100;
    return num;
  }`;
  useEffect(() => {
    Ace.require('ace/ext/language_tools');
    let aceInstance = Ace.edit(Editor.current);
    aceInstance.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/chaos',
    });
    // eslint-disable-next-line react/prop-types
    const { getRef, value } = props;
    getRef(aceInstance);
    aceInstance.session.setValue(value);
  });
  return <div className="ace-editor" ref={Editor}></div>;
};

export default AceComponent;
