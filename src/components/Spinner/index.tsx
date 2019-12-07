import React from 'react';
import './styles.css';
import withDelay from '@/hoc/withDelay';

const Spinner = () => <div className="spinner" data-testid="spinner" />;

export default withDelay({ delay: 500 })(Spinner);
