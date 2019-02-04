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

const withDelay = ({ delay }: { delay: number }) => <T extends {}>(
  Comp: React.ComponentType<T>,
) => (props: T) => {
  const delayComplete = useDelay(delay);
  return delayComplete ? <Comp {...props} /> : null;
};

export default withDelay;
