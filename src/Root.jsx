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
import Button from '@mui/material/Button';


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
    axios.post('https://lifting-journal-bnx5.onrender.com/sessions', sessionStart).then((response) => {
      sessionData = response.data
      console.log(sessionData)

    })
  }

  return (
    <>

      <div class="card">
        <div class="d-grid gap-2">
          <Link to={`/Session`} >
              <Button  onClick={establishSession}>Start Session</Button>
          </Link>
          <Link to={`/History`} >
              <Button >View History</Button>
          </Link>
          <Link to={`/`} >
              <Button  onClick={revokeToken}>Log Out</Button>
          </Link>
        </div>
      </div>

    </>
  )
}






































//const [count, setCount] = useState(0)


/*     <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <br/>
        <input>
        </input>
<br/>
        <Button onClick={() => navigate('session')}>
        Sign In
        </Button>


      </div>
 */

