'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Caclulator = () => {

    const [result, setResult] = useState('')
    const buttons = [
        ['C', '(', ')', 'del'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+']
    ]
    const numbers = ['1','2','3','4','5','6','7','8','9','0']
    const operators = ['+','-','*','/']
    const dot = ['.']

    const handleCalculation = (value : string) => {
        // Clear all
        if(value==='C'){
            setResult('')
        }
        // Evaluation / Calculation
        else if(value==='='){
            const lastChar = result.slice(-1);
            if(numbers.includes(lastChar)){
                const output = eval(result)
                setResult(output)
            } else{
                setResult('Error!')
            }
            
        }
        // Deleting last character
        else if(value==='del'){
            setResult(result.slice(0,-1))
        }
        // Multiple operators error handling
        else if(operators.includes(value)){
            // Check if last character is also an operator
            const lastChar = result.slice(-1);
            if(operators.includes(lastChar)){
            // Replace last operator with new one
            setResult(result.slice(0, -1) + value);
            }
            // Default
            else{
            setResult(result + value);
            }
        }
        // Only one dot (.) for a number
        // else if(dot.includes(value)){
        //     setResult(result + value)
        // }
        // Default
        else{
            setResult(result + value)
        }
    }
    return (
        <div className='bg-slate-500 max-w-fit max-h-fit rounded-xl p-5 m-5'>
        <div className='border border-black w-93 h-26 rounded-xl m-3 flex justify-end items-end p-3 text-2xl'>{result}</div> 
            {buttons.map((item,id)=>{
                return (
                    <div key={id} className='flex p-2'>
                        {item.map((val, idx)=>{
                            return (
                                <button  key={idx}
                                onClick={()=> handleCalculation(val)}
                                className='bg-black text-white p-4 m-2 rounded-xl w-20 cursor-pointer'>
                                    {val}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Caclulator