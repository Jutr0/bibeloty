import './ModalHeader.scss'

const ModalHeader = ({icon, children}) => {
    return <div className='modal-header'><div className="icon">{icon}</div>{children}</div>
}

export default ModalHeader;