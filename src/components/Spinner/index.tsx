import React, { useState, useEffect } from 'react';
import './styles.css';

const Spinner = () => {
  const [showSpinner, updateShowSpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      updateShowSpinner(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showSpinner ? <div className="spinner" /> : null;
};
export default Spinner;
