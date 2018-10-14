import React from 'react';

export default (queryHandler) => (WrappedComponent) => {
    return (props) => {
        let { location } = props;
        queryHandler(location);
        return (<WrappedComponent {...props}/>)
    }
}