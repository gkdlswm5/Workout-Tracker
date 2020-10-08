const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    time: {
        type: Date,
        default: Date.now
    },
    excercise: [
        {
            type: {
              type: String,
              trim: true,
              required: "Enter an exercise type"
            },
            name: {
              type: String,
              trim: true,
              required: "Enter an exercise name"
            },
            duration: {
              type: Number,
              required: "Enter an exercise duration in minutes"
            },
            weight: {
              type: Number
            },
            reps: {
              type: Number
            },
            sets: {
              type: Number
            },
            distance: {
              type: Number
            }
          }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;