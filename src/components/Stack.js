import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as spritejs from 'spritejs';
import PropTypes from 'prop-types';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import emptyStack from '../assets/stack.svg';
import styles from './Stack.module.css';
import { Pause, SkipBack, SkipForward, Play } from '@zeit-ui/react-icons';
import { useToasts, Display, Code } from '@zeit-ui/react';
import ReactDomServer from 'react-dom/server';

const { Scene, Sprite, Label } = spritejs;

const colors = [
  '#F15A57',
  '#F2C46E',
  '#B4C6E6',
  '#C6E6B4',
  '#FF7A5A',
  '#8ED2C9',
  '#FF5964',
  '#87E293',
];

const frameHeight = 100;
const frameY = 1350;
const spacing = 25;
const middle = 1200;
const left = 550;
const up = 200;
const right = 1850;

const makeTip = codes => (
  <Display width="500px" caption="递归栈帧执行状态">
    <Code block>{codes}</Code>
  </Display>
);

const Stack = ({ data }) => {
  const container = useRef(null);
  const runBtn = useRef(null);
  const backBtn = useRef(null);
  const forwardBtn = useRef(null);
  const [layer, setLayer] = useState(null);
  const [tipIns, setTipIns] = useState(null);
  // state to control pause btn status
  const [running, setRun] = useState(false);
  // state to avoid repeat animation
  const [isAnime, setIsAnime] = useState(false);
  const [, setToast] = useToasts();
  // frame in top - / frame out top +
  let top = 1300;
  const frames = [];
  let playRate = 1.0;
  // init scene effect
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 1600,
      mode: 'stickyTop',
    });
    setLayer(scene.layer());
    setTipIns(
      tippy(container.current, {
        placement: 'right',
        followCursor: true,
        plugins: [followCursor],
        trigger: 'manual',
        distance: 30,
        allowHTML: true,
        theme: 'light',
      })
    );
  }, []);

  useEffect(() => {
    if (tipIns) {
      runBtn.current.addEventListener('mouseenter', () => {
        tipIns.setContent('执行 / 暂停 递归帧执行状态动画');
        tipIns.show();
      });
      runBtn.current.addEventListener('mouseleave', () => {
        tipIns.hide();
      });
      backBtn.current.addEventListener('mouseenter', () => {
        tipIns.setContent('动画减速');
        tipIns.show();
      });
      backBtn.current.addEventListener('mouseleave', () => {
        tipIns.hide();
      });
      forwardBtn.current.addEventListener('mouseenter', () => {
        tipIns.setContent('动画加速');
        tipIns.show();
      });
      forwardBtn.current.addEventListener('mouseleave', () => {
        tipIns.hide();
      });
    }
  }, [tipIns]);

  useEffect(() => {
    if (layer) {
      const stack = new Sprite({
        texture: emptyStack,
        pos: [900, 250],
        size: [600, 1150],
      });
      const description = new Label('移动鼠标到栈帧上来查看执行信息').attr({
        pos: [500, 100],
        fillColor: '#FF7A5A',
        font: '55px "Menlo"',
        anchor: [0.5, 0.5],
      });
      layer.append(stack, description);
    }
  }, [layer]);

  const animationHandler = async () => {
    if (isAnime) {
      return;
    }
    if (data.length > 0) {
      setIsAnime(true);
      for (let index = 0; index < data.length; index++) {
        const current = data[index];
        if (current.status === 'enter') {
          await runPush(current, index);
        } else if (current.status === 'leave') {
          await runPop(current, index);
        }
      }
      setIsAnime(false);
      setRun(false);
    } else {
      setRun(false);
      setToast({ text: '请等待 Stack 信息分析完成后在试', type: 'warning' });
    }
  };

  const runPush = async (data, index) => {
    const entering = new Sprite({
      anchor: [0.5, 0.5],
      size: [500, frameHeight],
      pos: [left, frameY],
      bgcolor: colors[index % colors.length],
      borderRadius: 10,
      opacity: 0,
    });
    layer.append(entering);
    entering.addEventListener('mouseenter', evt => {
      entering.attr({
        opacity: 0.5,
      });
      const content = ReactDomServer.renderToStaticMarkup(
        makeTip(JSON.stringify(data, null, '  '))
      );
      tipIns.setContent(content);
      tipIns.show();
    });
    entering.addEventListener('mouseleave', evt => {
      entering.attr('opacity', 0.8);
      tipIns.hide();
    });
    await entering.animate(
      [
        { pos: [left, frameY], opacity: 1 },
        { pos: [left, up] },
        { pos: [middle, up] },
        { pos: [middle, top] },
      ],
      {
        duration: 1000,
        fill: 'both',
      }
    ).finished;
    frames.push(entering);
    top -= frameHeight + spacing;
  };

  const runPop = async () => {
    const exiting = frames.pop();
    await exiting.animate(
      [
        { pos: [middle, top] },
        { pos: [middle, up] },
        { pos: [right, up] },
        { pos: [right, frameY] },
        { pos: [right, frameY], opacity: 0 },
      ],
      {
        duration: 2000,
        fill: 'both',
      }
    ).finished;
    top += frameHeight + spacing;
    exiting.remove();
  };

  return (
    <>
      <div
        ref={container}
        style={{
          width: '100%',
          height: '80%',
          margin: 'auto',
          borderBottom: '1px solid var(--accents-2)',
        }}
      ></div>
      <div className={styles.btns}>
        <div
          ref={backBtn}
          className={`zi-btn ${styles.btn}`}
          onClick={() => {
            playRate -= 0.5;
            if (playRate <= 0) {
              playRate = 0.1;
            }
            layer.timeline.playbackRate = playRate;
          }}
        >
          <SkipBack />
        </div>
        <div
          ref={runBtn}
          className={`zi-btn primary ${styles.btn}`}
          onClick={() => {
            setRun(prev => !prev);
            playRate = running ? 0 : 1.0;
            layer.timeline.playbackRate = playRate;
            animationHandler();
          }}
        >
          {running ? <Pause /> : <Play />}
        </div>
        <div
          ref={forwardBtn}
          className={`zi-btn ${styles.btn}`}
          onClick={() => {
            playRate += 0.5;
            layer.timeline.playbackRate = playRate;
          }}
        >
          <SkipForward />
        </div>
      </div>
    </>
  );
};

Stack.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Stack;
