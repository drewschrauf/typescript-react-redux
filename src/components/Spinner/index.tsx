import React from 'react';
import * as styles from './styles.css';
import withDelay from '@/hoc/withDelay';

const Spinner: React.FC = () => <div className={styles.spinner} data-testid="spinner" />;

export default withDelay({ delay: 500 })(Spinner);
