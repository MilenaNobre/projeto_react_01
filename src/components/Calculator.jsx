import './Calculator.css'
import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";

export default props => {
    const [ displayValue, setDisplayValue ] =  useState("0")
    const [ clearDisplay, setClearDisplay ] =  useState(false)
    const [ operation, setOperation ] =  useState(null)
    const [ values, setValues ] =  useState([0, 0])
    const [ current, setCurrent ] =  useState(0)

    function clearMemory() {
            setDisplayValue("0")
            setClearDisplay(false)
            setOperation(null)
            setValues([0, 0])
            setCurrent(0)
    }

    function changeOperation(event) {
        if(current === 0) {
            setOperation(event)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const equals = event === "="

            setValues([eval(`${values[0]} ${operation} ${values[1]}`), 0])
            setDisplayValue(eval(`${values[0]} ${operation} ${values[1]}`))
            setOperation(equals ? null : event)

            setCurrent( equals ? 0 : 1)
            setClearDisplay(!equals)

        }
    }

    function addDigit(event){
        if(event === "." && displayValue.includes(".")){
            return
        }

        const clear = displayValue === "0" || clearDisplay
        const currentValue = clear ? "" : displayValue

        setDisplayValue( currentValue + event)
        setClearDisplay(false)

        const valuesAux = [...values]
        valuesAux[current] = currentValue + event
        setValues(valuesAux)

    }

    return (
        <div className="Calc">
            <Display value={displayValue}/>
            <Button label="AC" calcClass={["triple"]} calcButton={clearMemory}/>
            <Button label="/" calcClass={["operation"]} calcButton={changeOperation}/>

            <Button label="7" calcButton={addDigit}/>
            <Button label="8" calcButton={addDigit}/>
            <Button label="9" calcButton={addDigit}/>

            <Button label="*" calcClass={["operation"]} calcButton={changeOperation} />
            <Button label="4" calcButton={addDigit}/>
            <Button label="5" calcButton={addDigit}/>
            <Button label="6" calcButton={addDigit}/>

            <Button label="-" calcClass={["operation"]} calcButton={changeOperation}/>
            <Button label="1" calcButton={addDigit}/>
            <Button label="2" calcButton={addDigit}/>
            <Button label="3" calcButton={addDigit}/>

            <Button label="+" calcClass={["operation"]} calcButton={changeOperation}/>
            <Button label="0" calcClass={["double"]} calcButton={addDigit}/>
            <Button label="." calcButton={addDigit}/>
            <Button label="=" calcClass={["operation"]} calcButton={changeOperation}/>
        </div>
    )
}