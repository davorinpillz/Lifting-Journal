import { useState, useEffect, createContext } from 'react'
import reactLogo from './assets/react.svg'
import liftingJournalLogo from '/liftingJournalLogo.jpg'
import { Routes, Route } from 'react-router-dom';
import Session from './Session.jsx';
import Log from './Log.jsx';
import { Outlet, 
  Link, 
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"
import './App.css'

export default function Root() {
  
  let sessionData = ''
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const getUserDetails = async (accessToken) => {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );
      const data = await response.json();
      setUserDetails(data);
      Cookies.set('user', userDetails.name)
    };
  
    useEffect(() => {
      const accessToken = Cookies.get("access_token");
  
      if (!accessToken) {
        navigate("/");
      }
  
      getUserDetails(accessToken);

    }, [navigate]);
    let token = Cookies.get("access_token")
    const revokeToken = () => {
      axios.post(`https://oauth2.googleapis.com/revoke?token=${token}`)
    }

  const establishSession = async() => {
    const sessionStart = {
      user: userDetails.name,
      timeStart: new Date()
    }
    console.log(sessionStart.timeStart)
    axios.post('http://localhost:3001/sessions', sessionStart).then((response) => {
      sessionData = response.data
      console.log(sessionData)

    })
  }

  return (
    <>

      <div class="card">
        <div class="d-grid gap-2">
          <Link to={`/Session`} >
              <button type="button" class="w-100 btn btn-lg btn-primary" onClick={establishSession}>Start Session</button>
          </Link>
          <Link to={`/History`} >
              <button type="button" class="w-100 btn btn-lg btn-primary">View History</button>
          </Link>
          <Link to={`/`} >
              <button type="button" class="w-100 btn btn-lg btn-primary" onClick={revokeToken}>Log Out</button>
          </Link>
        </div>
      </div>

    </>
  )
}






































//const [count, setCount] = useState(0)


/*     <div className="card">
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
 */

