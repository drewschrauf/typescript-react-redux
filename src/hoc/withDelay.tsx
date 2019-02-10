import React, { useState, useEffect } from 'react';

const useDelay = (ms: number) => {
  const [delayComplete, updateDelayComplete] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      updateDelayComplete(true);
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return delayComplete;
};

interface WithDelayProps {
  /** Time to delay render in ms */
  delay: number;
}

/** Delays rendering of a component by a given time */
const withDelay = ({ delay }: WithDelayProps) => <T extends {}>(Comp: React.ComponentType<T>) => {
  const Delay = (props: T) => {
    const delayComplete = useDelay(delay);
    return delayComplete ? <Comp {...props} /> : null;
  };
  return Delay;
};

export default withDelay;
