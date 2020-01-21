import React from 'react'
import "./index.scss"
export const PButton = (props) => {
    let {
        to,
        children,
        className,
        style
    } = props;

    let addProps = {
        className:`_button${className ? ' ' + className.replace(/\s+/g,' ') : ''}`
    }

    if(to){
        addProps.href = to;
    }
    if(style){
        addProps.style = style;
    }

    return(
        React.createElement(
            'a',
            addProps,
            children
        )
    )
}