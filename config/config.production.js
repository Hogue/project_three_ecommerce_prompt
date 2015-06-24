var config = require('./config.global.js');

// make any production-specific changes here

config.env = 'production';
// config.hostname = 'intense-coast-5573.herokuapp.com';
config.serverPort = process.env.PORT; // heroku is particular

// config.authCallbackUrl = 'https://intense-coast-5573.herokuapp.com/auth/github/callback';
// config.authStrategy = 'github'

// cookie settings

config.cookieOptions.secure = true;

config.mongo.dbUrl = 'mongodb://andrew.hogue:Hog94306-@ds063899.mongolab.com:63899/nozama';

// make sure we can fetch our secrets from the environment

var missingSecrets = [];
config.secretNames.forEach(function(name) {
  if (process.env[name] !== undefined) {
    config.secrets[name] = process.env[name];
  } else {
    missingSecrets.push(name);
  }
});

if (missingSecrets.length > 0) {
  throw new Error('Cannot start server without secrets: ' + missingSecrets.join(', '));
}

module.exports = config;
