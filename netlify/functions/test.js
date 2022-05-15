// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

exports.handler = async function(event, context) {
    var fs = require('fs');

    var michelo = "{ \"employee\" : { \"name\" : \"Michelo\" } }"

    fs.appendFile('michelo.json', JSON.stringify(JSON.parse(michelo)), function (err) {
    if (err) throw err;
        console.log('Saved!');
    });
}
