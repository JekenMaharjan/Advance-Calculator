'use client'
import React, { useState } from 'react'

const Calculator = () => {
    const [result, setResult] = useState('')

    const buttons = [
        ['C', '(', ')', 'del'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '00', '.', '+'],
        ['%', 'x²', '√', '=']
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
        <div 
        className='flex flex-col items-center justify-center h-screen'
        style={{ background: "linear-gradient(135deg, #ff9900bd 0%, #444444ff 100%)" }}
        >
            <h1 className='text-4xl font-serif font-extrabold'>CALCULATOR</h1>
            <div className='bg-gray-800/50 max-w-fit rounded-xl p-5 m-5 border-1 border-gray-500 shadow-2xl'>
                <div className='border border-black w-93 h-26 rounded-xl m-3 flex justify-end items-end p-3 text-2xl bg-gray-800/40 text-gray-200'>
                    {result || 0}
                </div> 
                {buttons.map((row, id) => (
                    <div key={id} className='flex p-2 flex-wrap'>
                        {row.map((val, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCalculation(val)}
                                className={`${
                                    operators.includes(val) ? 'bg-orange-400/80 hover:bg-orange-500/80' : 'bg-black/80 hover:bg-gray-800/80'
                                    } 
                                    text-white p-4 m-2 rounded-xl w-20 cursor-pointer text-xl hover:scale-110 transition-all duration-300`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calculator
