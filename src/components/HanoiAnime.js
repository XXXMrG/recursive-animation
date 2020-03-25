import React from 'react';
import { useRef, useEffect, useState } from 'react';
import * as spritejs from 'spritejs';
import Pillar from '../assets/bang.svg';

const { Scene, Sprite, Path } = spritejs;

const hanoi = (n, from, cache, to) => {
  if (n === 0) {
    return;
  }
  hanoi(n - 1, from, to, cache);
  console.log(`disk ${n} from ${from} ---> ${to}`);
  hanoi(n - 1, cache, from, to);
};

// hanoi(3, 'A', 'B', 'C');

const xA = 450;
const xB = 1600;
const xC = 1950;

const HanoiAnime = props => {
  const container = useRef(null);
  const { isRun } = props;
  const [box, setBox] = useState(null);
  const [layer, setLayer] = useState(null);
  // init scene effect
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 1600,
      mode: 'stickyTop',
    });
    setLayer(scene.layer());
    setBox(
      new Sprite({
        anchor: [0.5, 0.5],
        size: [600, 50],
        pos: [450, 1280],
        bgcolor: 'pink',
        borderRadius: 20,
        zIndex: 99,
      })
    );
  }, []);
  // init layer effect
  useEffect(() => {
    if (layer) {
      layer.append(box);
      const bangA = new Sprite({
        texture: Pillar,
        pos: [100, 350],
        size: [700, 1000],
      });
      const bangB = bangA.cloneNode().attr({
        pos: [850, 350],
      });
      const bangC = bangA.cloneNode().attr({
        pos: [1600, 350],
      });
      layer.append(bangA, bangB, bangC);
    }
  }, [layer, box]);
  // animation control effect
  useEffect(() => {
    if (isRun) {
      box.animate(
        [
          { pos: [450, 1280] },
          { pos: [450, 350] },
          { pos: [xC, 200] },
          { pos: [xC, 1280] },
        ],
        {
          duration: 3000,
          fill: 'both',
        }
      );
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
