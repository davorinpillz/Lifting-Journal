import './App.css'
import { Form } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Workout from './models/Workout.js'
import { useLocation } from 'react-router-dom';
import { Outlet, 
    Link, 
    useLoaderData,
    redirect,
    NavLink,
    useNavigation,
  } from "react-router-dom";
  import FilteredList from './FilteredList.jsx'
import Button from '@mui/material/Button';
  
  
function History () {
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

    const [currentLift, setCurrentLift] = useState('')

    const [currentWeight, setCurrentWeight] = useState(0)
    const setWeight = async(event) => {
        await setCurrentWeight(event.target.value)
    }
    const [currentReps, setCurrentReps] = useState(0)
    const setReps = async(event) => {
        await setCurrentReps(event.target.value)
    }
    const [currentTimer, setCurrentTimer] = useState(0)
    const setTimer = async(event) => {
        await setCurrentTimer(event.target.value)
    }

    const [currentNotes, setCurrentNotes] = useState('')
    const setNotes = async(event) => {
        await setCurrentNotes(event.target.value)
    }
    const [bodyWeight, setCurrentBodyWeight] = useState('')
    const setBodyWeight = async(event) => {
        await setCurrentBodyWeight(event.target.value)
    }
    const [liftHistory, setLiftHistory] = useState([])
    const [filteredSessions, setFilteredSessions] = useState([])
    const selectLift = (event) => {
        setCurrentLift(event.target.id)
    }
     function getLiftSessions() {
         axios.get(`https://lifting-journal-1.onrender.com/${userDetails.name}/${currentLift}`)
            .then((response) => {
                setLiftHistory(response.data)
            })
            .catch((e) => {
                console.error("Error fetching data: ", e)
            })
    }
    useEffect(() => {
        getLiftSessions()
 //       console.log(currentLift)
    }, [currentLift])
 //  console.log(liftHistory)
    //const filteredLiftHistory = liftHistory.filter(session => session.sets.map(set => set.lift) == "Deadlift")
    const mappedSessions = liftHistory.map((session) => {
        return (
            session.sets
        )})

   // console.log(filteredLiftHistory)
   console.log(mappedSessions)
      const mappedLifts = mappedSessions.flatMap((lift) => {
        return (
            lift
        )
      })
      const mappedFlatMappedLifts = mappedLifts.map((lift) => {
        return (
            [lift.lift, lift.weight, lift.reps, lift.notes, lift.timeComplete]
        )
      })
      console.log(mappedFlatMappedLifts)
      const filteredFlatMappedLifts = mappedFlatMappedLifts.filter((lift) => lift[0] == currentLift)
      console.log(filteredFlatMappedLifts)
    return (
        <>
        <div class="card">
            <div class="row">
                <table>
                <tr>
                                <th>Lift</th>
                                <th>Weight</th>
                                <th>Reps</th>
                                <th>Notes</th>
                                <th>Date and Time</th>
                            </tr> 
                {filteredFlatMappedLifts.map((lift) => {
                    return (
                            <tr>
                                <td>{lift[0]}</td>
                                <td>{lift[1]}</td>
                                <td>{lift[2]}</td>
                                <td>{lift[3]}</td>
                                <td>{new Date(lift[4]).toLocaleDateString()}</td>
                            </tr>
                       )
                })}
                </table>
            </div>
        </div>
        <br></br>
        <div class="card">
        <div class="row">
                    <div class="dropdown">
                        <Button  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentLift ? currentLift : "Select Lift"}
                        </Button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a id="Deadlift" class="dropdown-item" href="#" onClick={selectLift}>Deadlift</a>
                            <a id="Power Clean" class="dropdown-item" href="#" onClick={selectLift}>Power Clean</a>
                            <a id="Overhead Press" class="dropdown-item" href="#" onClick={selectLift}>Overhead Press</a>
                            <a id="Push Press" class="dropdown-item" href="#" onClick={selectLift}>Push Press</a>
                            <a id="Squat" class="dropdown-item" href="#" onClick={selectLift}>Squat</a>
                            <a id="Bench Press" class="dropdown-item" href="#" onClick={selectLift}>Bench Press</a>
                            <a id="Barbell Curl" class="dropdown-item" href="#" onClick={selectLift}>Barbell Curl</a>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <Link to='/Session'>
                            <Button >Current Session</Button>
                        </Link>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <Link to='/Main'>
                            <Button >Main Menu</Button>
                        </Link>
                    </div>
                </div>
        </div>
      </>
    )
}

export default History
/*                <div class="row">
                    <p>{sessionDetails._id} </p>
                    <p>Started at: {sessionDetails.timeStart}</p>
                </div>
                
                                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                    <Form id="enter-time-between-sets">
                        <input
                            type="text"
                            id="timer"
                            aria-label='Enter time between sets'
                            placeholder="Enter time between sets"
                            onChange={setTimer}
                        />
                    </Form>
                    </div>
                </div>*/