const express = require('express')

const app = express()
const PORT = 3000

const request = require('request');
const semver = require('semver');

const pjson = require('./package.json');

const bent = require('bent')
const getJSON = bent('json')
const semverMaxSatisfying = require('semver/ranges/max-satisfying')

app.listen(PORT, () => {
  console.log("Server is listening on port:",`${PORT}`);
});

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views',
  //new configuration parameter
  extname: 'hbs',
  //new configuration parameter
  defaultLayout: 'dependencies',
  }));


app.get('/', (req, res) => {
  res.render('Node.js Examples Initiative Challenge');
});

var d = 1;

//get the package .json dependencies   use this json to show using handlebars
  app.get('/dependencies', (req, res) => {
  // res.render('dependencies', {pjson});
   res.render("dependencies", { dependencies: pjson.dependencies });
  })

  
    
 /* GET :/minimum-secure 
 * if versions are same as previous then check highest version of each line which has security is true
 */
  app.get('/minimum-secure', async (req, res) => {
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
   
  })


  /*
  * get latest release version in each release V14 2.3.4 V14 1.2.3 pick 14 2.3.4
  */
  app.get('/latest-releases', async (req, res) => {
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
  })


  module.exports = app
  
  

