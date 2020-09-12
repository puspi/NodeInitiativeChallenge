const express = require('express')
const hbs = require('hbs')

const app = express()
const PORT = 3000

const dependencies = require('./routes/dependencies')
const latestReleases = require('./routes/latestReleases')
const minimunSecure = require('./routes/minimumSecure')


app.listen(PORT, () => {
  console.log("Server is listening on port:",`${PORT}`);
});


app.set('view engine', hbs); 

app.use('/dependencies', dependencies)
app.use('/latest-releases', latestReleases)
app.use('/minimum-secure', minimunSecure)

module.exports = app
  
  

