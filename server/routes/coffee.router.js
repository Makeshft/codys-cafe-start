const router = require('express').Router()
const {Coffee} = require('../models')
const Sequelize = require('sequelize');

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async (req, res, next) => {
    try {
        const coffees = await Coffee.findAll();
        res.send(coffees);
    } catch (e) {
        console.error(e.stack)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const [newCoffee, created] = await Coffee.findOrCreate({
            where: {
                name: req.body.name
            }
        });
        res.status(201)
        res.send(newCoffee);
    } catch (e) {
        console.error(e.stack);
    }
});

router.get('/ingredients/:ingredientName', async (req, res, next) => {
    try {
        const ingredientName = req.params.ingredientName;
        const coffee = await Coffee.findByIngredient(ingredientName);
        res.send(coffee);
    } catch (e) {
        console.error(e.stack);
    }
});

router.get('/:coffeeId', async (req, res, next) => {
    try {
        const coffeeId = req.params.coffeeId;
        const coffee = await Coffee.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: coffeeId
                }
            }
        });

        if(coffee === null) {
            res.status(404);
        };

        res.send(coffee);
    } catch (e) {
        console.error(e.stack);
    }
});

module.exports = router
