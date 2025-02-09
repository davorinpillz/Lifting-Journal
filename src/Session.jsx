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
import Button from '@mui/material/Button';
  
function Session () {


    
  const [sessionDetails, setSessionDetails] = useState({});

    const getSessionDetails = async () => {
        const response = await fetch(
          `https://lifting-journal-bnx5.onrender.com/sessions`
        );
        const data = await response.json();
        setSessionDetails(data);
      };
    
      useEffect(() => {
        getSessionDetails();
      },[]);
      console.log(sessionDetails)


    const [currentLift, setCurrentLift] = useState('')
    const selectLift = event => {
        setCurrentLift(event.target.id)
    }
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

    const saveSet = async() => {
        const setData = { set: 
            [{
                lift: currentLift,
                weight: currentWeight,
                reps: currentReps,
                notes: currentNotes,
                timeComplete: new Date()
            }],
            id: sessionDetails._id
        }
        axios.put(`https://lifting-journal-bnx5.onrender.com/sessions`, setData).then((res)=> {
            console.log(res)
        })
        alert("Set Saved")
        setCurrentNotes('')
    }
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
    
    console.log(currentWeight, currentReps, currentTimer, currentNotes, currentLift)
    return (
        <>
        <div class="card">

                <div class="row">
                    <div class="dropdown">
                        <Button id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentLift ? currentLift : "Select Lift"}
                        </Button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a id="Deadlift" class="dropdown-item" href="#" onClick={selectLift}>Deadlift</a>
                            <a id="Power Clean" class="dropdown-item" href="#" onClick={selectLift}>Power Clean</a>
                            <a id="Overhead Press" class="dropdown-item" href="#" onClick={selectLift}>Overhead Press</a>
                            <a id="Push Press" class="dropdown-item" href="#" onClick={selectLift}>Push Press</a>
                            <a id="Squat" class="dropdown-item" href="#" onClick={selectLift}>Squat</a>
                            <a id="Bench Press" class="dropdown-item" href="#" onClick={selectLift}>Bench Press</a>
                            <a id="KB Clean & Push Press" class="dropdown-item" href="#" onClick={selectLift}>KB Clean & Push Press</a>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    <div class="col-sm">
                    <Form id="enter-weight">
                        <input
                            type="text"
                            id="weight"
                            aria-label='Enter weight'
                            placeholder="Enter weight"
                            onChange={setWeight}
                        />
                    </Form>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                    <Form id="enter-reps">
                        <input
                            type="text"
                            id="reps"
                            aria-label='Enter reps'
                            placeholder="Enter reps"
                            onChange={setReps}
                        />
                    </Form>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                <   Form id="enter-bodyweight">
                        <input
                            type="text"
                            id="bodyweight"
                            aria-label='Enter bodyweight'
                            placeholder="Enter bodyweight"
                            onChange={setBodyWeight}
                        />
                    </Form>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                <   Form id="enter-notes">
                        <input
                            type="text"
                            id="notes"
                            aria-label='Enter notes'
                            placeholder="Enter notes"
                            onChange={setNotes}
                        />
                    </Form>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <Button  onClick={saveSet}>Save Set</Button>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                    <Link to='/Main'>
                        <Button /*onClick={revokeToken}*/>Save Session</Button>
                    </Link>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <Link to='/History'>
                            <Button >View History</Button>
                        </Link>
                    </div>
                </div>
        </div>
      </>
    )
}

export default Session
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