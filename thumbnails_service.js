'use strict';

const cote = require('cote');
const thumb = require('node-thumbnail').thumb;
const path = require('path')

const responder = new cote.Responder({ name: 'thumbnails responder'});

responder.on('create-thumbnail', (req, done) => {
    console.log('filenameeeee')
    thumb({
        prefix: 'thumb-',
        suffix: '',
        source: path.join(__dirname, `/public/images/${req.filename}`),
        destination: path.join(__dirname, `/public/images/thumbnails`),
      }).then(() => {
        console.log('Success');
        done();
      }
      ).catch(err => console.log('Error', err))
});
