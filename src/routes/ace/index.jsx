import React from 'react';
import Ace from '../../components/Ace';
import style from './ace.module.css';

function AceEditor() {
  return (
    <div className={style.App}>
      <div className={style.Ace}>
        <Ace />
      </div>
    </div>
  );
}

export default AceEditor;
