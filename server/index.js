import React from 'react';
import express from 'express';
import { renderToNodeStream } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
import fs from 'fs';
import App from '../src/App';

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync('dist/index.html').toString();

// his technique here is to create an array of html so he can insert the App into the innerText of #root, aka render all above and opening div or root, insert app, render closing div and all below 
const parts = html.split('not rendered');

const app = express();

// use everything in the dist dir AS the server dist
app.use('/dist', express.static('dist'));

// middleware to run everytime a req happens
app.use((req, res) => {
    // immediately send first part
    res.write(parts[0]);
    const reactMarkup = (
        <ServerLocation url={req.url}>
            <App />
        </ServerLocation>
    );

    //create a stream to progressively load data - stream sends many small parcels instead of one large payload
    const stream = renderToNodeStream(reactMarkup);

    // this connects the two pipes 
    stream.pipe(
        res,
        {end: false}
    );

    // then when you are done send the last part and end
    stream.on("end", () => {
        res.write(parts[1]);
        res.end();
    });
});

console.log('listening on ' + PORT);
app.listen(PORT);