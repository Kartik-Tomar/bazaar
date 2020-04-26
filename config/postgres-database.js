const Sequelize = require("sequelize");
const postCred = require("../config/keys").postCred;
const { Client } = require("pg");

const client = new Client({});

// const postDb = new Sequelize(
//   postCred.database,
//   postCred.user,
//   postCred.password,
//   postCred.dbType
// );

const postDb = new Sequelize(
  "postgres://rrlwgamouqprua:5d37456b68afc41bedd9d64d8c0257a444ba9d40f37fccb31b3e9e467a3f3857@ec2-54-159-112-44.compute-1.amazonaws.com:5432/df3vkeqs77n55v",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOption: {
      ssl: true,
    },
  }
);

postDb
  .authenticate()
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = postDb;
