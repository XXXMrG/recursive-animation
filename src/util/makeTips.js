/* eslint-disable react/jsx-key */
import React from 'react';
import styles from './tips.module.css';
import exImg from '../assets/pg-example.jpg';
import fibImg from '../assets/FibonacciRabbit.svg';
import fibTri from '../assets/PascalTriangleFibonacci.svg';
import hanoiImg from '../assets/HanoiEx-1.jpeg';
import hanoiEx from '../assets/HanoiEx-2.jpeg';
import { Display, Image } from '@zeit-ui/react';

export function getFibTips() {
  return [
    <div className={styles.pgOne}>
      <Display shadow caption="兔子对的数量就是斐波那契数列">
        <Image src={fibImg} height="350" width="512" alt="tips-example" />
      </Display>
      <div className={styles.fibDes}>
        <p className={styles.fibText}>
          根据高德纳（Donald Ervin Knuth）的《计算机程序设计艺术》（The Art of
          Computer
          Programming），1150年印度数学家Gopala和金月在研究箱子包装对象长宽刚好为1和2的可行方法数目时，首先描述这个数列。在西方，最先研究这个数列的人是比萨的列奥那多（意大利人斐波那契Leonardo
          Fibonacci），他描述兔子生长的数目时用上了这数列:
        </p>
        <ul>
          <li>第一个月初有一对刚诞生的兔子</li>
          <li>第二个月之后（第三个月初）它们可以生育</li>
          <li>每月每对可生育的兔子会诞生下一对新兔子</li>
          <li>兔子永不死去</li>
        </ul>
      </div>
    </div>,
    <div className={styles.pgOne}>
      <Display
        shadow
        caption="斐波纳契数是帕斯卡三角形的每一条红色对角线上数字的和。
"
      >
        <Image src={fibTri} height="350" width="512" alt="tips-example" />
      </Display>
      <div className={styles.exDes}>
        <h4>在数学上，斐波那契数列是以递归的方法来定义：</h4>
        <ul>
          <li>F(0) = 0</li>
          <li>F(1) = 1</li>
          <li>F(n) = F(n - 1) + F(n - 2); (n &gt; 2)</li>
        </ul>
      </div>
    </div>,
    <div className={styles.pgTwo}>
      <h3>
        <span>⚠️</span>使用方法和注意事项
      </h3>
      <div style={{ width: '100%' }}></div>
      <ul>
        <li>选择斐波那契求解项会自动执行动画</li>
        <li>
          由于递归树膨胀的特性，系统目前最大只支持 5 阶斐波那契数列的求解动画
        </li>
        <li>等待递归树动画结束后才能执行堆栈动作演示动画</li>
        <li>
          动画执行的优先级高于数据更新，意味着新的演示数据要等待旧的动画结束后才会更新
        </li>
      </ul>
    </div>,
  ];
}

export function getHanoiTips() {
  return [
    <div className={styles.pgOne}>
      <Display shadow caption="常见玩具版汉诺塔有8个圆盘">
        <Image src={hanoiImg} height="350" width="512" alt="tips-example" />
      </Display>
      <div className={styles.fibDes}>
        <p className={styles.fibText}>
          汉诺塔（港台：河内塔）是根据一个传说形成的数学问题：
          有三根杆子A，B，C。A杆上有 N 个 (N &gt; 1)
          穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至 C
          杆：
        </p>
        <ul>
          <li>每次只能移动一个圆盘；</li>
          <li>大盘不能叠在小盘上面。</li>
        </ul>
        <p className={styles.fibText}>
          提示：可将圆盘临时置于 B 杆，也可将从 A 杆移出的圆盘重新移回 A
          杆，但都必须遵循上述两条规则。 问：如何移？最少要移动多少次？
        </p>
      </div>
    </div>,
    <div className={styles.pgOne}>
      <Display shadow caption="汉诺塔递归求解过程">
        <Image src={hanoiEx} height="350" width="512" alt="tips-example" />
      </Display>
      <div className={styles.exDes}>
        <p style={{ margin: 'auto 50px' }}>
          解法的基本思想是递归。假设有 A、B、C 三个塔，A 塔有 N
          块盘，目标是把这些盘全部移到 C 塔。那么先把 A 塔顶部的 N-1 块盘移动到
          B 塔，再把 A 塔剩下的大盘移到 C，最后把 B 塔的 N-1 块盘移到 C。
          如此递归地使用下去, 就可以求解。
        </p>
      </div>
    </div>,
    <div className={styles.pgTwo}>
      <h3>
        <span>⚠️</span>使用方法和注意事项
      </h3>
      <div style={{ width: '100%' }}></div>
      <ul>
        <li>
          选择汉诺塔层数并点击<code>RUN</code>来执行动画
        </li>
        <li>由于问题复杂度限制，系统目前最大支持 8 层汉诺塔的求解动画</li>
        <li>等待算法动画结束后才能执行堆栈动作演示动画</li>
        <li>
          动画执行的优先级高于数据更新，意味着新的演示数据要等待旧的动画结束后才会更新
        </li>
      </ul>
    </div>,
  ];
}

export function getPGTips() {
  return [
    <div className={styles.pgOne}>
      <Display shadow caption="系统会自动分析代码中包含的函数定义">
        <Image src={exImg} height="350" width="512" alt="tips-example" />
      </Display>
      <div className={styles.exDes}>
        <h3>输入并选取要分析的递归函数</h3>
        <ul>
          <li>在代码输入框中输入想要分析执行过程的代码</li>
          <li>代码可以包含多个函数过程，但至少包含一个递归函数</li>
          <li>不要忘记在代码中启动函数调用</li>
          <li>在上面的选择框中选择要进行分析的递归函数</li>
          <li>
            点击 <code>RUN</code> 来执行
          </li>
        </ul>
      </div>
    </div>,
    <div className={styles.pgTwo}>
      <h3>
        <span>⚠️</span>注意事项
      </h3>
      <div style={{ width: '100%' }}></div>
      <ul>
        <li>
          目前只支持 <code> JavaScript </code> 代码
        </li>
        <li>不要使用箭头函数</li>
        <li>不支持尾递归，以为着你的代码必须存在显式递归过程</li>
      </ul>
    </div>,
  ];
}
