var fs = require("fs");
var Gootenberg = require('gootenberg');
var config = require('../config.json');

module.exports = function(credentials, token, config) {
        return async function getSheets(){
          const goot = new Gootenberg();
          await goot.auth.oauth(credentials, token);

          //loop through each sheet ID
          await Promise.all(Object.keys(config.sheets).map(async (p) => {

            if (config.sheets[p]){ //skip if there isn't a doc id here
            const sheets = await goot.parse.table(config.sheets[p])
            if (!fs.existsSync('app/data')) {
              fs.mkdirSync('app/data') //if we don't have a data dir yet, make one
            }
            fs.writeFile(`app/data/${p.split('_').slice(0,-1).join('_')}.json`,JSON.stringify(sheets, null, '  '), function(err) {
              console.log('Completed ' + p.split('_').slice(0,-1).join('_')+'.json')
              if (err) {
                console.log('Unable to write file: ' + p.split('_').slice(0,-1).join('_')+'.json')
              }
            })
          }
          }))
        }
};
