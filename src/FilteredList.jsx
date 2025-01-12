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
  


function FilteredList (props) {
    console.log(props.currentlift)
    return (
        <>
        <div class="card">
            <h1>{props.currentlift}</h1>
        </div>
      </>
    )
}

export default FilteredList
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
