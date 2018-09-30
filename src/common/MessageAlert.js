import React from 'react';
import cn from 'classnames';
import { FiAlertTriangle, FiInfo, FiLoader } from 'react-icons/fi';

import styles from './MessageAlert.module.css';

export const Info = 'INFO';
export const Err = 'ERROR';
export const Waiting = "LOADING";

const getIconInfo = (type) => {
    switch(type) {
        case Err:
            return {
                className: "message__err",
                icon: <FiAlertTriangle/>
            };

        case Info:
            return {
                className: "message__info",
                icon: <FiInfo/>
            };

        case Waiting:
            return {
                className: "message__waiting",
                icon: <FiLoader/>
            };

        default:
            return null;
    }
};

export default function Message(props) {
    let {
        type,
        message,
        className
    } = props;

    let iconInfo = getIconInfo(type);

    return (
        <div className={cn(className, styles.main)}>
            {iconInfo ?
                <span className={cn("message__icon", iconInfo.className)}>{iconInfo.icon}</span>:
                null}
            <span className="message__message">{message}</span>
        </div>
    )
}