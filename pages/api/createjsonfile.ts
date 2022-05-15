// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    var fs = require('fs');

    var michelo = "{ \"employee\" : { \"name\" : \"Michelo\" } }"

    fs.appendFile('data/michelo.json', JSON.stringify(JSON.parse(michelo)), function (err:any) {
    if (err) throw err;
        console.log('Saved!');
    });

    res.status(200).json({ message: 'file created' })
}
