
function Button({name, text, Icon}) {
    return(
        <div className={name}>
            {Icon && <Icon className="button__icon"/>}
            {text && <span className="button__text">{text}</span>}   
        </div>
    )
};

export default Button