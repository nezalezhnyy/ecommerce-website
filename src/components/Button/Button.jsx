import styles from './Button.module.css'

function Button({text, Icon}) {
    return(
        <div className={styles.root}>
            {Icon && <Icon className={styles.icon} stroke={1.4}/>}
            {text && <span className={styles.text}>{text}</span>}   
        </div>
    )
};

export default Button