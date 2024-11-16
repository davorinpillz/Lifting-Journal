import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';


function Session () {
    const navigate = useNavigate()

    const [count, setCount] = useState(0)

    return (
        <>
        <p className="read-the-docs">
            SESSION
        </p>
        <button className="btn" onClick={() => navigate(-1)}>
        Log Out
        </button>
        </>
    )
}

export default Session
