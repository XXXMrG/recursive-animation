import React from 'react';
import { useRef, useEffect } from 'react';
import Ace from 'ace-builds';
import './component.css';

const AceComponent = () => {
  const Editor = useRef(null);
  useEffect(() => {
    console.log(Editor);
    const aceInstance = Ace.edit(Editor.current);
  });
  return <div className="ace-editor" ref={Editor}></div>;
};

export default AceComponent;
