const {client} = require("./db")
client.connect()

const getAutoWorld = (request, response) => {
    client.query('SELECT * FROM autoworld', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports={
    getAutoWorld
  }