function ProductCard({props}) {
    console.log(props)

    return (
        <div className="product-card">
            <div className="product-card__img" style={{backgroundImage: `URL(${props.images[0]})`}}>
                
            </div>
            <div className="product-card__text">
                <span className="product-card__title">{props.title}</span>
                <h3 className="product-card__price">{props.price}$</h3>
            </div>
        </div>
    )
}

export default ProductCard