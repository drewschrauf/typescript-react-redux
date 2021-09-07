import React from 'react';
import { Link } from 'react-router-dom';
import {
  dropdownLinkStyle,
  linkListItemStyle,
  linkListStyle,
  linkWrapperStyle,
  wrapperStyle,
} from './Navigation.css';

const Navigation: React.FC = () => (
  <div className={wrapperStyle}>
    <div className={linkWrapperStyle}>
      <Link className={dropdownLinkStyle} to="/">
        Count
      </Link>
      <ul className={linkListStyle}>
        {[1, 2, 3, 5, 8].map((increment) => (
          <li className={linkListItemStyle} key={increment}>
            <Link to={`/by/${increment}`}>By {increment}</Link>
          </li>
        ))}
      </ul>
    </div>
    <div className={linkWrapperStyle}>
      <Link to="/about/">About</Link>
    </div>
  </div>
);
export default Navigation;
