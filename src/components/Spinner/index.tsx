import React from 'react';
import './styles.css';
import withDelay from '../../hoc/withDelay';

const Spinner = () => <div className="spinner" />;

export default withDelay({ delay: 500 })(Spinner);
