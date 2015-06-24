var config = {};

config.env = 'development';
config.hostname = 'localhost';
config.serverPort = 3000;

config.authCallbackUrl = '';
config.authStrategy = 'local';

// cookies

config.cookieOptions = {};

// mongo database

config.mongo = {};
config.mongo.dbUrl = 'mongodb://andrew.hogue:Hog94306-@ds063899.mongolab.com:63899/nozama';

// authentication keys & such that may vary from environment
// to environment but must never be committed to github
//
// may be stored in config/secrets.json
// but we prefer them in environment variables

config.secrets = {};

config.secretNames = [
  // 'GITHUB_CLIENT_SECRET',
  // 'GITHUB_CLIENT_ID',
  // 'SESSION_KEY'
];

module.exports = config;
