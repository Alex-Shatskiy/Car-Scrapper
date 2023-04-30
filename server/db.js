
const {Pool, Client} = require('pg')
const pgp = require('pg-promise')();

const client = new Pool({
    host: 'car.cub5uqvia3hf.ap-southeast-2.rds.amazonaws.com',
    port: 5432,
    database: 'initial_db',
    user: 'postgres',
    password: '',
})

const db = pgp({
    host: 'car.cub5uqvia3hf.ap-southeast-2.rds.amazonaws.com',
    port: 5432,
    database: 'initial_db',
    user: 'postgres',
    password: '',
 });
 


module.exports =  {
    client,
    db
}