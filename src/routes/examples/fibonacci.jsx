import React from 'react';
import { useEffect } from 'react';
import style from './fibonacci.module.css';
import Fibtree from '../../components/Fibtree';

function Fibonacci() {
  return (
    <div className={style.container}>
      <div className={style.canvas}>
        <Fibtree />
      </div>
    </div>
  );
}

export default Fibonacci;
