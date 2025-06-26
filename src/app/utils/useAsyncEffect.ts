import React, { useEffect, useRef } from 'react';

type PromiseFunction = (
  checkIsLatestCall: () => boolean,
  waitForNextCall: () => Promise<void>,
) => Promise<void>;

const useAsyncEffect = (
  fun: PromiseFunction,
  dependencies: React.DependencyList | undefined,
) => {
  const nextCall = useRef<PromiseFunction | null>(null);
  const nextCallQueued = useRef<Function | null>(null);

  useEffect(() => {
    (async () => {
      const alreadyRunning = !!nextCall.current;

      nextCall.current = fun;
      nextCallQueued.current?.();

      if (alreadyRunning) {
        return;
      }

      while (true) {
        const startingPromise = nextCall.current;
        const checkIsLatestCall = () => startingPromise === nextCall.current;
        const nextCallQueuedPromise = new Promise<void>((resolve) => {
          nextCallQueued.current = resolve;
        });

        await nextCall.current(checkIsLatestCall, () => nextCallQueuedPromise);

        if (checkIsLatestCall()) {
          nextCall.current = null;

          return;
        }
      }
    })();
  }, dependencies);
};

export default useAsyncEffect;
