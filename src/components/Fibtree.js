import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as spritejs from 'spritejs';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';

const { Scene, Polyline, Arc } = spritejs;
const getXoffset = (dis, angle) =>
  Math.round(dis * Math.sin(Math.PI * (angle / 180)));
const getYoffset = (dis, angle) =>
  Math.round(dis * Math.cos(Math.PI * (angle / 180)));

const radius = 62;
const distance = 100;
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

/**
 *
 * @param {number} rootX
 * @param {number} rootY
 * @param {boolean} hasChild
 * @param {number} value
 * Attention: this function have effect
 */
async function drawTree(rootX, rootY, hasChild, value, layer, tipIns) {
  const offsetAngle = (value + 1) * 10;
  const offsetDistance = distance + (value - 2) * 100;
  const fillColor = colors[value];
  const id = `${new Date().getTime()}`;
  //
  const node = new Arc();
  node.attr({
    fillColor,
    radius,
    x: rootX,
    y: rootY,
    opacity: 0,
    id,
  });
  if (value <= 1) {
    node.attr({
      strokeColor: 'black',
      lineWidth: 10,
    });
  }
  layer.append(node);
  await node.transition(1.0).attr({
    opacity: 0.8,
  });

  node.addEventListener('mouseenter', evt => {
    node.attr({
      opacity: 0.5,
    });
    tipIns.setContent(`fib(${value})`);
    tipIns.show();
  });
  node.addEventListener('mouseleave', evt => {
    node.attr('opacity', 0.8);
    tipIns.hide();
  });
  //
  if (hasChild) {
    //
    const LxStart = rootX - getXoffset(radius, offsetAngle),
      LyStart = rootY + getYoffset(radius, offsetAngle),
      LxEnd = Math.round(LxStart - getXoffset(offsetDistance, offsetAngle)),
      LyEnd = Math.round(LyStart + getYoffset(offsetDistance, offsetAngle));
    const left = new Polyline({
      strokeColor: 'black',
      lineWidth: 4,
      points: [LxStart, LyStart, LxStart, LyStart],
      opacity: 0.8,
    });
    layer.append(left);
    await left.transition(0.3).attr({
      points: [LxStart, LyStart, LxEnd, LyEnd],
    });

    //
    const RxStart = LxStart + 2 * getXoffset(radius, offsetAngle),
      RyStart = LyStart,
      RxEnd = RxStart + getXoffset(offsetDistance, offsetAngle),
      RyEnd = LyEnd;
    const right = left.cloneNode().attr({
      points: [RxStart, RyStart, RxStart, RyStart],
    });
    layer.append(right);
    await right.transition(0.3).attr({
      points: [RxStart, RyStart, RxEnd, RyEnd],
    });

    return {
      leftChild: [
        LxEnd - getXoffset(radius, offsetAngle),
        LyEnd + getYoffset(radius, offsetAngle),
      ],
      rightChild: [
        RxEnd + getXoffset(radius, offsetAngle),
        RyEnd + getYoffset(radius, offsetAngle),
      ],
    };
  }
  // // no child default return null
  // return null;
}

function Fibtree(props) {
  const container = useRef(null);
  const { number, getStack } = props;
  const [layer, setLayer] = useState(null);
  const [tipIns, setTipIns] = useState(null);
  let stack = [];
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 3200,
      mode: 'stickyTop',
    });
    setLayer(scene.layer());
    // the instance of tippy used to show node detail
    setTipIns(
      tippy(container.current, {
        placement: 'right',
        followCursor: true,
        plugins: [followCursor],
        trigger: 'manual',
        distance: 30,
      })
    );
  }, []);

  const runAnimation = async () => {
    getStack && getStack({ data: [], loading: true });
    async function fib(num, x, y) {
      stack.push({ status: 'enter', funcName: 'fibonacci', number: num });
      if (num <= 1) {
        stack.push({ status: 'leave', funcName: 'fibonacci', number: num });
        await drawTree(x, y, false, num, layer, tipIns);
        return;
      }
      const { leftChild, rightChild } = await drawTree(
        x,
        y,
        true,
        num,
        layer,
        tipIns
      );
      await fib(num - 1, leftChild[0], leftChild[1]);
      await fib(num - 2, rightChild[0], rightChild[1]);
      stack.push({ status: 'leave', funcName: 'fibonacci', number: num });
    }
    await fib(number, 1200, 200);
    getStack && getStack({ data: stack, loading: false });
  };

  useEffect(() => {
    if (layer && tipIns) {
      layer.removeAllChildren();
      runAnimation();
    }
  }, [layer, tipIns, number]);
  return (
    <div
      ref={container}
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto',
      }}
    ></div>
  );
}

Fibtree.propTypes = {
  number: PropTypes.number.isRequired,
  getStack: PropTypes.func,
};

export default Fibtree;
