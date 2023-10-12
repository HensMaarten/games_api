const express = require('express');
const router = express.Router();
const Game = require('./models/game');

router.get('/', (req, res) => {
    console.log('/ route called');
    res.send('<h1>Welcome to my Api, these are the available routes:</h1>')
});

router.get('/games', async (req, res) => {
    console.log('/games route called');
    try {
        res.json(await Game.find());
    } catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.get('/game/:id', async (req, res) => {
    console.log('/game/:id route called');
    try {
        res.json(await Game.findById(req.params.id));
    } catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

router.get('/games/:title', async (req, res) => {
    console.log('/game/:title route called');
    try {
        res.json(await Game.find({title: req.params.title.toLowerCase()}));
    } catch(e){
        console.log(e)
        res.sendStatus(500);
    }
});

module.exports = router;