import React from "react";

import styles from './ContainerBox.module.css';

const ContainerBox = ({ children }) => {
  return (
    <div className={styles.containerBox}>
        {children}
    </div>
  );
};

export default ContainerBox;
