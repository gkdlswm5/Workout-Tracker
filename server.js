const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const routes = require("./routes")
const path = require("path");
const db = require("./models")

const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(routes)

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

mongoose.connection.once('open', function() {
  console.log("Database connected")
})

//html
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", function(req, res){
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})


//POST route
app.post("/api/workouts", (req, res) => {
  console.log(req.body);
  db.Workout.create(req.body)
  .then((workout) => res.json(workout));;
});

//GET route
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).then((data) => res.json(data))
});


app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  db.Workout.findByIdAndUpdate(
    req.params.id, {
      $push : 
      {
        excercise: req.body
      }
    }
  ).then(data => {
    res.json(data);
    console.log(data)
  }).catch(err => console.log(err))
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
