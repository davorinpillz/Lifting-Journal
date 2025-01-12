import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <p>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </p>
    </div>
  );
}


    /*const saveSet = async() => {
        const setData = { set: 
            [{
                lift: currentLift,
                weight: currentWeight,
                reps: currentReps,
                notes: currentNotes
            }],
            id: sessionDetails._id
        }
        axios.put(`http://localhost:3001/sessions`, setData).then((res)=> {
            console.log(res)
        })
    }
    useEffect(() => {
        if(currentTimer > 0) {
            setInterval(() => {
                setCurrentTimer(currentTimer - 1)
            }, 1000)
        }
        else console.log("nothing")
    })*/