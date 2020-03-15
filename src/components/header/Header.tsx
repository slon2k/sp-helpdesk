import * as React from "react";
import styles from "./Header.module.scss";

const Header: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>{children}</div>
    </div>
  );
};

export default Header;
