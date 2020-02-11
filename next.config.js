const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    DB_CREDENTIALS: "MONGODB_CREDENTIALS_HERE",
  }
});