import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import './Modal.scss';
import classnames from "classnames";

const Modal = ({children, className, toggle, isOpen, size, backdropClassName, zIndex}) => {

    useEffect(() => {
        if (isOpen) {
            const originalOverflow = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    return isOpen ? createPortal(
        <div className="modal" style={{zIndex}}>
            <div className={classnames("overlay", {[`${backdropClassName}`]: !!backdropClassName})} onClick={toggle}/>
            <div className={classnames("modal-dialog", className, {[`modal-${size}`]: !!size})}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
        , document.body) : null;

}

export default Modal;