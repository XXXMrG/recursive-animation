const hanoi = (n, from, cache, to) => {
  if (n === -1) {
    return;
  }
  hanoi(n - 1, from, to, cache);
  console.log(`disk ${n} ---> ${to}`);
  hanoi(n - 1, cache, from, to);
};

hanoi(2, 'A', 'B', 'C');