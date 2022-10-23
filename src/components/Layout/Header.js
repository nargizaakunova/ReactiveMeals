import React from 'react';
import meals from '../../assets/meals.jpeg';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactiveMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="A table full of delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
