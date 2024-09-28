import React from 'react'

const Input = ({ label, type, onChange }) => {
    return (
        <div className='flex flex-col w-1/2 justify-center'>
            <label className='text-lg'>
                {label}
            </label>
            <input type={type} onChange={onChange} className="border rounded-lg p-1" />
        </div>
    )
}

export default Input
