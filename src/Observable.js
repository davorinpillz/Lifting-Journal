import './App.css'
import { Form } from "react-router-dom"
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Workout from './models/Workout.js'
import { useLocation } from 'react-router-dom';
import Observable from './Observable.js'

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
                notes: currentNotes
            }],
            id: sessionDetails._id
        }
        console.log(parseInt(document.getElementById("timer").textContent))
        axios.put(`http://localhost:3001/sessions`, setData).then((res)=> {
            console.log(res)
        })
    }
    const startTimer = (time) => {
        setCurrentTimer(time - 1)
    }
    const saveSetAndStartTimer = async() => {
        saveSet()
        setInterval(()=> {
            setCurrentTimer(currentTimer - 1)
        }), 1000

    }




    console.log(currentWeight, currentReps, currentTimer, currentNotes, currentLift)
    return (
        <>
        <div class="card">
                <div class="row">
                    <p>{sessionDetails._id} </p>
                    <p>Started at: {sessionDetails.timeStart}</p>
                    <h2 id="timer">{currentTimer}</h2>
                </div>
                <br></br>
                <div class="row">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {currentLift ? currentLift : "Select Lift"}
                        </button>
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
                        <button type="button" class="btn btn-primary btn-sm" onClick={saveSetAndStartTimer} >Save Set</button>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <button type="button" class="btn btn-primary btn-sm">Save Session</button>
                    </div>
                </div>
                <br></br>
                <div class="row justify-content-md-center">
                    <div class="col-sm">
                        <button type="button" class="btn btn-primary btn-sm">View History</button>
                    </div>
                </div>
        </div>
      </>
    )
}

export default Session
