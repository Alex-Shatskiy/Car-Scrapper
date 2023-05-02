
const {Pool, Client} = require('pg')
require('dotenv').config()
const pgp = require('pg-promise')();

const client = new Pool({
    host: process.env.PG_HOST,
    port: 5432,
    database: process.env.DATABASE ,
    user: process.env.USER ,
    password: process.env.PASSWORD ,
})

const db = pgp({
    host: process.env.PG_HOST,
    port: 5432,
    database: process.env.DATABASE ,
    user: process.env.USER ,
    password: process.env.PASSWORD ,
 });
 


module.exports =  {
    client,
    db
}