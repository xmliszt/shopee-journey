import * as React from 'react';

import styles from './styles.scss';

function Button({ children, onClick }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
