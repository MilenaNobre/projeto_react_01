import './Calculator.css'
import React from 'react'

export default props => {
    const calcClass = [ "button" , ...props.calcClass || [] ]

    return (
        <>
            <button className={ calcClass.join(" ") }  onClick={ _ => props.calcButton(props.label)} > { props.label }</button>
        </>
    )
}