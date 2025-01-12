import mongoose from "mongoose"

const workoutSchema =  new mongoose.Schema({
    user: String,
    bodyWeight: Number,
    timeStart: String,
    timeEnd: Number,
    duration: Number,
    sets: [{
        lift: String,
        weight: Number,
        reps: Number,
        notes: String,
        timeComplete: String
    }]
})

const Workout = mongoose.model("Workout", workoutSchema)

export default Workout