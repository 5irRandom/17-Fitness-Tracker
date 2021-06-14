const router = require('express').Router();
const db = require('../models');

router.get('/api/workouts', async (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    }])
    .then((data) => {
        res.json(data);
    });
});

router.put('/api/workouts/:id', async (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
});

router.post('/api/workouts', async (req, res) => {
    db.Workout.create(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get('/api/workouts/range', async (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration'
            }
        }
    }])
    .sort({ _id: -1 })
    .limit(7)
    .then((data) => { res.json(data) })
    .catch(err => { res.status(400).json(err) });
});

module.exports = router;