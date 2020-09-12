const express = require('express');

const pjson = require('../package.json');

const router = express.Router()

router.get('/', async(req, res) => {  
    try {
        res.render('dependencies.hbs', { dependencies: pjson.dependencies })
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
 
})


module.exports = router