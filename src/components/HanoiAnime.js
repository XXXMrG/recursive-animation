import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as spritejs from 'spritejs';
import Pillar from '../assets/bang.svg';

const { Scene, Sprite } = spritejs;

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
const boxHeight = 60;
const bottomY = 1096;
const base = 100;
const rate = 70;

const HanoiAnime = props => {
  const container = useRef(null);
  const { isRun, disks, getMoves } = props;
  const [box, setBox] = useState([]);
  const [layer, setLayer] = useState(null);
  const Pillars = {
    A: { x: 450, top: 1096 },
    B: { x: 1200, top: 1096 },
    C: { x: 1950, top: 1096 },
  };
  let moves = 0;
  // init scene effect
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 1600,
      mode: 'stickyTop',
    });
    setLayer(scene.layer());
  }, []);
  // init layer effect
  useEffect(() => {
    if (layer) {
      const bangA = new Sprite({
        texture: Pillar,
        pos: [100, 350],
        size: [700, 800],
      });
      const bangB = bangA.cloneNode().attr({
        pos: [850, 350],
      });
      const bangC = bangA.cloneNode().attr({
        pos: [1600, 350],
      });
      layer.append(bangA, bangB, bangC);
    }
  }, [layer]);
  // box update effect
  useEffect(() => {
    // remove old box.
    if (box.length !== 0) {
      box.forEach(value => value.remove());
    }
    setBox(
      Array.from(
        { length: disks },
        (v, k) =>
          new Sprite({
            anchor: [0.5, 0.5],
            size: [base + k * rate, boxHeight],
            pos: [Pillars['A'].x, bottomY - (disks - k - 1) * boxHeight],
            bgcolor: colors[k],
            borderRadius: 25,
            zIndex: 99,
          })
      )
    );
  }, [disks]);
  // layer update effect
  useEffect(() => {
    layer && layer.append(...box);
  }, [layer, box]);

  /**
   * @param {number} deep should use disks - 1
   * @param {string} from from disk index
   * @param {string} cache cache disk index
   * @param {string} to to disk index
   */
  const runAnimation = async (deep, from, cache, to) => {
    if (deep === -1) {
      return;
    }
    await runAnimation(deep - 1, from, to, cache);
    await box[deep].animate(
      [
        { pos: [Pillars[from].x, Pillars[from].top] },
        { pos: [Pillars[from].x, 350] },
        { pos: [Pillars[to].x, 200] },
        { pos: [Pillars[to].x, Pillars[to].top] },
      ],
      {
        duration: 1000,
        fill: 'both',
      }
    ).finished;
    getMoves(++moves);
    Pillars[from].top += boxHeight;
    Pillars[to].top -= boxHeight;
    await runAnimation(deep - 1, cache, from, to);
  };
  // animation control effect
  useEffect(() => {
    if (isRun) {
      Pillars['A'].top -= disks * boxHeight;
      runAnimation(disks - 1, 'A', 'B', 'C');
    }
  }, [isRun]);

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
};

export default HanoiAnime;
