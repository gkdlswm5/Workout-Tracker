const workout = require('../models/workout');

module.exports = {
    addExercise: function(req, res) {
        console.log(req.body)
        workout
        .create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err))
    },
    
}