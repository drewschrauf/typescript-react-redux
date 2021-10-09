import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Navigation.css';

const Navigation: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.linkWrapper}>
      <Link className={styles.dropdownLink} to="/">
        Count
      </Link>
      <ul className={styles.linkList}>
        {[1, 2, 3, 5, 8].map((increment) => (
          <li className={styles.linkListItem} key={increment}>
            <Link to={`/by/${increment}`}>By {increment}</Link>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.linkWrapper}>
      <Link to="/about/">About</Link>
    </div>
  </div>
);
export default Navigation;
