import React from 'react';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material-darker.css';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/trailingspace';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import './code.css';

const defaultConfig = {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'material-darker',
  autoCloseBrackets: true,
  styleActiveLine: true,
  showTrailingSpace: true,
  tabSize: 2,
  showCursorWhenSelecting: true,
  hintOptions: {
    completeSingle: false,
  },
};

const Code = props => {
  const Editor = useRef(null);
  useEffect(() => {
    const { height, width } = props;
    const mirror = CodeMirror(Editor.current, {
      ...defaultConfig,
      ...props,
    });
    if (height && width) {
      mirror.setSize(height, width);
    }
    // set autocomplete
    mirror.on('cursorActivity', () => {
      mirror.showHint();
    });
    // you can use mirror object to control eventEmitter
  });
  return <div ref={Editor} className="editor"></div>;
};

Code.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Code;
