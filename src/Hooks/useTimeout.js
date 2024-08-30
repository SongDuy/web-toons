import { useEffect, useRef } from 'react';

function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    let timeoutId;
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      timeoutId = setTimeout(tick, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [delay]);
}

export default useTimeout;