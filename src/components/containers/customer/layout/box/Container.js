import "./Container.scss"
import classnames from "classnames";

const Container = ({children, className}) => {
return <div className={classnames("container", className)}>{children}</div>
}

export default Container;