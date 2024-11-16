import { useState } from 'react'
import reactLogo from './assets/react.svg'
import liftbookLogo from '/liftbook_logo.jpg'
import { Routes, Route } from 'react-router-dom';
import Session from './Session.jsx';
import Log from './Log.jsx';

import { useNavigate } from 'react-router-dom';

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <div>

        <a href="https://vite.dev" target="_blank">
          <img src={liftbookLogo} className="logo" alt="Vite logo" />
        </a>

      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br/>
        <input>
        </input>
<br/>
        <button onClick={() => navigate('session')}>
        Sign In
        </button>


      </div>
      <Routes>

      <Route path="/session" element={Session} />
      <Route path="/log" element={Log} />
      </Routes>
    </>
  )
}

export default App
