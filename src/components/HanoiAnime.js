import React from 'react';
import { useRef, useEffect } from 'react';
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

const HanoiAnime = () => {
  const container = useRef(null);
  useEffect(() => {
    const scene = new Scene({
      container: container.current,
      width: 2400,
      height: 1600,
      mode: 'stickyTop',
    });
    const layer = scene.layer();
    const box = new Sprite({
      anchor: [0.5, 0.5],
      size: [500, 50],
      pos: [1000, 800],
      bgcolor: 'pink',
      borderWidth: 10,
      borderRadius: 20,
    });
    const bang = new Sprite({
      normalize: true,
      texture: Pillar,
      pos: [1000, 100],
      size: [500, 500],
    });
    layer.append(bang);
    layer.append(box);
  });
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
