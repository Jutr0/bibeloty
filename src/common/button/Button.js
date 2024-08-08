import classnames from 'classnames';
import './Button.scss'
const Button = ({className, onClick, children}) => {

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick && onClick(e)
    }

    return <button className={classnames('button', className)} onClick={handleClick}>
        {children}
    </button>
}

export default Button;