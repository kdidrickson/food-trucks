import React from 'react';

export default ({
  number
}) => {
  const styles = require('./MapItem.scss');

  return (
    <div
      className={styles.MapItem}
      children={number}
    />
  );
};
