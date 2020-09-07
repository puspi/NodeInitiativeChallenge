const express = require('express')

const app = express()
const PORT = 3000

const request = require('request');
const semver = require('semver');

const pjson = require('./package.json');


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

//add handle bars
//add tests

  //TODO : 
  // write tests

//get the package .json dependencies   use this json to show using handlebars
  app.get('/dependencies', (req, res) => {
   res.render('dependencies', {pjson});
  })

  
    
 /* GET :/minimum-secure 
 * if versions are same as previous then check highest version of each line which has security is true
 */
  app.get('/minimum-secure', (req, res) => {

    request('https://nodejs.org/dist/index.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
      
            var result = JSON.parse(body);

            let minscore = {};
            let versionMatch = false;
  
            for(const val of result){
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
        }
    });
  })


  /*
  * get latest release version in each release V14 2.3.4 V14 1.2.3 pick 14 2.3.4
  */
  app.get('/latest-releases', (req, res) => {

    request('https://nodejs.org/dist/index.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
      
            var result = JSON.parse(body);
            
            let versionMatch = false;
            let latestReleases = {}; 

            for(const val of result){
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
        }
    });
  })
  
  

