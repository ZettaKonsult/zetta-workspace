import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import NavLink from '../NavLink';

const Navigation = ({ activeState, pages, root, onClick }) => (
  <div className="PageNavigation">
    {pages.map((item, i) => (
      <NavLink
        to={`${root}/${item}`}
        id={item}
        key={item + i}
        className={activeState === item ? 'selectedPage' : ''}
        label={item}
        onClick={() => onClick(item)}
      />
    ))}
  </div>
);

Navigation.propTypes = {
  activeState: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default Navigation;
