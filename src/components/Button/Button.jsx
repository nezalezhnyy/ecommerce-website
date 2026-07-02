import styles from './Button.module.css'

function Button({text, Icon, onClick}) {
    return(
        <div className={styles.root} onClick={onClick}>
            {Icon && <Icon className={styles.icon} stroke={1.4}/>}
            {text && <span className={styles.text}>{text}</span>}
        </div>
    )
};

export default Button