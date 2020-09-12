const express = require('express')
const bent = require('bent')
const getJSON = bent('json')

const semver = require('semver');

const router = express.Router()


router.get('/', async(req, res) => {
    try {
        const response = await getJSON(`https://nodejs.org/dist/index.json`)
        
        let versionMatch = false;
        let latestReleases = {}; 

        for(const val of response){
            let version = val.version.split(".")[0];

            if(latestReleases.hasOwnProperty(version)) {
                const valueObj = latestReleases[version];
                versionMatch = semver.gt(val.version,valueObj.version);

                if(versionMatch){
                    latestReleases[version]= val;
                }
            } else {
                latestReleases[version]= val;
            }
        }
        res.send(latestReleases)
    } catch (error) {
        res.send(`An error occured on ${req.route.path}, ${error}`)
    }
  })


module.exports = router