import clsx from 'clsx';

import styles from './Button.module.css'

function Button({ 
  children, 
  size = 'medium', 
  variant = 'default', 
  onClick, 
  disabled = false,
}) {
  return (
    <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
            styles.btn,
            styles[`btn--${size}`],
            styles[`btn--${variant}`], 
        )}
    >
      {children}
    </button>
  );
}

export default Button