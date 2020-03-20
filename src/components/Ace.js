import React from 'react';
import { useRef, useEffect } from 'react';
import Ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver.js';
import './Ace.css';

const AceComponent = props => {
  const Editor = useRef(null);
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
    const { getRef, onChange, defaultValue } = props;
    defaultValue && aceInstance.setValue(defaultValue);
    getRef && getRef(aceInstance);
    aceInstance.session.on('change', () => {
      onChange(aceInstance.getValue());
    });
  }, []);

  return <div className="ace-editor" ref={Editor}></div>;
};

export default AceComponent;
