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
function Session () {


    
  const [sessionDetails, setSessionDetails] = useState({});

    const getSessionDetails = async () => {
        const response = await fetch(
          `http://localhost:3001/sessions`
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
        axios.put(`http://localhost:3001/sessions`, setData).then((res)=> {
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
                        <button class="w-100 btn btn-lg btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentLift ? currentLift : "Select Lift"}
                        </button>
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
                        <button type="button" class="w-100 btn btn-lg btn-primary" onClick={saveSet}>Save Set</button>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                    <Link to='/Main'>
                        <button type="button" class="w-100 btn btn-lg btn-primary" /*onClick={revokeToken}*/>Save Session</button>
                    </Link>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <Link to='/History'>
                            <button type="button" class="w-100 btn btn-lg btn-primary">View History</button>
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