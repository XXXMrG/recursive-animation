import React from 'react';
import { useRef, useEffect } from 'react';
import * as spritejs from 'spritejs';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const { Scene, Polyline, Arc, Path } = spritejs;
const getXoffset = (dis, angle) =>
  Math.round(dis * Math.sin(Math.PI * (angle / 180)));
const getYoffset = (dis, angle) =>
  Math.round(dis * Math.cos(Math.PI * (angle / 180)));

const radius = 60;
const angle = 40;
const distance = 100;
// same value node have same color
const colorHash = {
  0: 'red',
};

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
  const r = Math.round(255 * Math.random()),
    g = Math.round(255 * Math.random()),
    b = Math.round(255 * Math.random());
  let fillColor;
  if (colorHash[value]) {
    fillColor = colorHash[value];
  } else {
    fillColor = `rgb(${r}, ${g}, ${b})`;
    colorHash[value] = fillColor;
  }
  const id = `${new Date().getTime()}`;
  //
  const node = new Arc();
  node.attr({
    strokeColor: fillColor,
    lineWidth: 10,
    radius,
    x: rootX,
    y: rootY,
    opacity: 0,
    id,
  });
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
  const { number } = props;
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 3200,
      mode: 'stickyTop',
    });
    const layer = scene.layer();
    // the instance of tippy used to show node detail
    const tipIns = tippy(container.current, {
      placement: 'right',
      followCursor: true,
      plugins: [followCursor],
      trigger: 'manual',
      distance: 30,
    });

    async function fib(num, x, y) {
      if (num <= 1) {
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
    }
    fib(number, 1200, 200);
  }, []);
  return (
    <div
      ref={container}
      style={{
        width: 'inherit',
        height: 'inherit',
        margin: 'auto',
      }}
    ></div>
  );
}

export default Fibtree;
