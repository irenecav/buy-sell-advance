module.exports = {
  apps : [{
    name: 'creationThumbnail',
    script: './thumbnails_service.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
   
  },{
    name: 'NODEAPI',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
  

  }],

};
