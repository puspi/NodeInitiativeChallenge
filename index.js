const express = require('express')

const app = express()
const PORT = 3000

const request = require('request');

var pjson = require('./package.json');
console.log(pjson.dependencies);

app.listen(PORT, () => {
    console.log("Server is listening on port:",`${PORT}`);
  });


  app.get('/', (req, res) => {
    res.send('Welcome to my page')
  })

//get the package .json dependencies   use this json to show using hsndlebar hbs
  app.get('/dependencies', (req, res) => {
    console.log();
    res.send(pjson.dependencies)
  })

  
  //minimum-secure   
  //TODO : - compare versions using semver
  app.get('/minimum-secure', (req, res) => {

    request('https://nodejs.org/dist/index.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
      
            var result = JSON.parse(body);

            let minscore = {}; 
            let i =0, count =0;
            for(const val of result){
                let version = val.version.split(".")[0];

              // TODO :  if versions are same as previous then check highest version of each line which has security is true
               
                if(val.security){
                    console.log(version);
                    minscore[version]= val;
                    count++;
                }
                i++;
            }
            console.log(count);
            res.send(minscore)
        }
    });
  })


  //TODO :  get latest release version in each release V14 2.3.4 V14 1.2.3 pick 14 2.3.4
  app.get('/latest-releases', (req, res) => {

    request('https://nodejs.org/dist/index.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
      
            var result = JSON.parse(body);

            let latest_releases = {}; 
            let i =0; let count =0;
            for(const val of result){
                let v = "v"+i;
                if(val.security){
                    latest_releases[v]= val;
                }
                i++;
            }
            res.send(latest_releases)
        }
    });
  })
  
  

