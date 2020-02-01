import React from 'react';
import { useRef, useEffect } from 'react';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material-darker.css';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  editor: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    height: 400,
    width: 400,
  },
});

const Code = props => {
  const Editor = useRef(null);
  const classes = useStyle();
  console.log(props);
  useEffect(() => {
    const mirror = CodeMirror(Editor.current, {
      value: 'function myScript(){ \nconst fuck = 2; \nreturn 100;}\n',
      mode: 'javascript',
      theme: 'material-darker',
      ...props,
    });
    mirror.setSize(500, 500);
    // you can use mirror object to control eventEmitter
  });
  return <div ref={Editor}></div>;
};

export default Code;
