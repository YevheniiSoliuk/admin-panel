require('dotenv').config();

module.exports = {
   keySession: [process.env.KEY_SESSION],
   SECRET: process.env.SECRET,
   maxAgeSession: 24 * 60 * 60 * 1000, // 24 godziny
   tokenAge: 60 * 60, // godzina
   adminPassword: process.env.ADMIN_PASSWORD,
   testUserPassword: process.env.TEST_USER_PASSWORD,
   saltRounds: process.env.SALT_ROUNDS,
}