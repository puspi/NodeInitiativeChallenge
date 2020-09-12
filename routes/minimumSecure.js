const express = require('express')
const bent = require('bent')
const getJSON = bent('json')

const semver = require('semver');

const router = express.Router()


router.get('/', async(req, res) => {
    try {
        const response = await getJSON(`https://nodejs.org/dist/index.json`)

        let minscore = {};
        let versionMatch = false;

        for(const val of response){
          if(val.security){
              let version = val.version.split(".")[0];

              if(minscore.hasOwnProperty(version)) {
                  const valueObj = minscore[version];
                  versionMatch = semver.gt(val.version,valueObj.version);

                  if(versionMatch){
                    minscore[version] = val;
                  }
              } else {
                minscore[version]= val;
              }
          }
      }
        res.send(minscore)
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
  })

module.exports = router
