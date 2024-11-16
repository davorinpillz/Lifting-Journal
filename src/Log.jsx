import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';


const Log = () => {
    const [count, setCount] = useState(0)

    return (
        <>
        <p className="read-the-docs">
        LOG
        </p>
        </>
    )
}

export default Log
