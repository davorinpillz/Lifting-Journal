const app = express();
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
app.use(Cors())
import Cookies from "js-cookie";

import Workout from '../models/Workout.js'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



mongoose.connect('mongodb+srv://ddp1329:JM0RTtuIEM69XzBu@sljcluster.5fj9m.mongodb.net/decemer?retryWrites=true&w=majority&appName=SLJCluster')


mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB database');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

//endpoints
app.post('/sessions', function(req,res) {
  let newWorkout = new Workout({user: req.body.user, 
    timeStart: req.body.timeStart
  })
  newWorkout.save()
  res.send(newWorkout)

})
app.get('/sessions', function(req,res) {
  let session =  Workout.findOne({}).sort({_id: -1}).then((r) => {
    res.send(r)
  })
})
app.put('/sessions', async (req, res) => {
  console.log(req.body)
  try {
    await Workout.findByIdAndUpdate({"_id": req.body.id}, {$push: {"sets": req.body.set}})
    res.send("Session updated")
  } catch(e) {
    console.log(e.message)
    res.send(400).send('Server Error')
  }
})
app.get('/:name/:lift',  async (req,res) => {
  console.log(req.params.name, req.params.lift)
  try {
  let lifts = await Workout.find({user: req.params.name}).find({'sets.lift': req.params.lift})
  res.send(lifts)
  } catch(e) {
    console.log(e.message)
    res.send(400).send('Server Error')
  }

})

app.get('/',  async (req,res) => {
  try {
  res.send("Server works")
  } catch(e) {
    console.log(e.message)
    res.send(400).send('Server Error')
  }

})