import React, { useState, useEffect } from 'react';

const useDelay = (ms: number): boolean => {
  const [delayComplete, setDelayComplete] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, ms);
    return (): void => {
      clearTimeout(timer);
    };
  }, [ms]);
  return delayComplete;
};

interface WithDelayOptions {
  /** Time to delay render in ms */
  delay: number;
}

/** Delays rendering of a component by a given time */
const withDelay =
  ({ delay }: WithDelayOptions) =>
  <T extends unknown>(Comp: React.ComponentType<T>): React.ComponentType<T> => {
    const Delay: React.FC<T> = (props) => {
      const delayComplete = useDelay(delay);
      // eslint-disable-next-line react/jsx-props-no-spreading
      return delayComplete ? <Comp {...props} /> : null;
    };
    return Delay;
  };

export default withDelay;
