import styles from './ProductCard.module.css'

function ProductCard({props}) {

    return (
        <div className={styles.root}>
            <div className={styles.img} style={{backgroundImage: `URL(${props.images[0]})`}}></div>
            <div className={styles.description}>
                <span className={styles.title}>{props.title}</span>
                <h3 className={styles.price}>{props.price}$</h3>
            </div>
        </div>
    )
}

export default ProductCard