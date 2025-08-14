'use client'
import React, { useState } from 'react'

const Calculator = () => {
    const [result, setResult] = useState('')

    const buttons = [
        ['C', '(', ')', 'del'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['%', 'x²', '√']
    ]

    const numbers = ['1','2','3','4','5','6','7','8','9','0']
    const operators = ['+','-','*','/']
    
    const handleCalculation = (value: string) => {
        // Clear all
        if(value === 'C'){
            setResult('')
        }
        // Calculate percentage
        else if(value === '%'){
            if(result){
                const output = parseFloat(result) / 100
                setResult(output.toString())
            }
        }
        // Square
        else if(value === 'x²'){
            if(result){
                const output = Math.pow(parseFloat(result), 2)
                setResult(output.toString())
            }
        }
        // Square root
        else if(value === '√'){
            if(result){
                const output = Math.sqrt(parseFloat(result))
                setResult(output.toString())
            }
        }
        // Evaluation
        else if(value === '='){
            try {
                const lastChar = result.slice(-1)
                if(numbers.includes(lastChar)){
                    const output = eval(result)
                    setResult(output.toString())
                } else {
                    setResult('Error!')
                }
            } catch {
                setResult('Error!')
            }
        }
        // Delete last character
        else if(value === 'del'){
            setResult(result.slice(0,-1))
        }
        // Avoid multiple operators in a row
        else if(operators.includes(value)){
            const lastChar = result.slice(-1)
            if(operators.includes(lastChar)){
                setResult(result.slice(0, -1) + value)
            } else {
                setResult(result + value)
            }
        }
        // Allow only one dot per number
        else if(value === '.'){
            const parts = result.split(/[\+\-\*\/]/) // split by operators
            const lastPart = parts[parts.length - 1]
            if(!lastPart.includes('.')){
                setResult(result + value)
            }
        }
        // Default (numbers, brackets, etc.)
        else {
            setResult(result + value)
        }
    }

    return (
        <div className='bg-slate-500 max-w-fit rounded-xl p-5 m-5'>
            <div className='border border-black w-93 h-26 rounded-xl m-3 flex justify-end items-end p-3 text-2xl'>
                {result || 0}
            </div> 
            {buttons.map((row, id) => (
                <div key={id} className='flex p-2 flex-wrap'>
                    {row.map((val, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleCalculation(val)}
                            className='bg-black text-white p-4 m-2 rounded-xl w-20 cursor-pointer'
                        >
                            {val}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Calculator
