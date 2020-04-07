import { wrap, releaseProxy } from 'comlink';
import { useEffect, useState, useMemo } from 'react';

/**
 *
 * @param {string} code you can only use this worker hook
 * to exe some long task, but if you want a rpc like exe
 * just use comlink in your component.
 */
export function useGetFuncNames(code) {
  const [data, setData] = useState({
    loading: false,
    names: [],
  });
  const { workerApi } = useWorker();
  useEffect(() => {
    setData({ loading: false, names: [] });
    workerApi.getFuncNames(code).then(res => {
      setData({ loading: false, names: res });
    });
  }, [code, workerApi, setData]);
  return data;
}

function useWorker() {
  const workerApiAndClean = useMemo(makeWorkerApiAndCleanup(), []);
  useEffect(() => {
    const { cleanup } = workerApiAndClean;
    // when worker done exe cleanup
    return () => {
      cleanup();
    };
  }, [workerApiAndClean]);
  // return a memo obj
  return workerApiAndClean;
}

/**
 * Creates a worker, a cleanup function and returns it
 */
function makeWorkerApiAndCleanup() {
  // Here we create our worker and wrap it with comlink so we can interact with it
  const worker = new Worker('../util/worker.js', {
    type: 'module',
  });
  const workerApi = wrap(worker);

  // A cleanup function that releases the comlink proxy and terminates the worker
  const cleanup = () => {
    workerApi[releaseProxy]();
    worker.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
}
