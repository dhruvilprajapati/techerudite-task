import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='fixed top-0 left-0 bg-gray-200 p-5 flex gap-3 w-full justify-end'>
            <button className='btn' onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}

export default Header
