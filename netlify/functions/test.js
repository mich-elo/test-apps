// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(
  req,
  res) {
    var fs = require('fs');

    var michelo = "{ \"employee\" : { \"name\" : \"Michelo\" } }"

    fs.appendFile('michelo.json', JSON.stringify(JSON.parse(michelo)), function (err) {
    if (err) throw err;
        console.log('Saved!');
    });

    res.status(200).json({ message: 'file created' })
}
