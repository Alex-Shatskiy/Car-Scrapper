const express = require("express")
const cors = require('cors')
const {getAutoWorld} = require('./dbCalls')
const {client} = require("./db")

client.connect()
const app = express()
const port = 5000

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.get('/', async (req,res) =>{
  
// })

app.get("/carsCheap", async (req, res) => {
  try {
    const result = await client.query(`Select * from cheapcars`);''
    
    res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.get("/wholeSale", async (req, res) => {
  try {
    const result = await client.query(`Select * from wholesalecars`);
    
    res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.get("/autoWorld", async (req, res) => {
  try {
    const result = await client.query(`Select * from autoworld`);
    
    res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.get("/coventryCars", async (req, res) => {
  try {
    const result = await client.query(`Select * from conventrycars`);
    
    res.status(200).send({ data: result.rows});
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.get("/valuemotors", async (req, res) => {
  try {
    const result = await client.query(`Select * from valuemotors`);
    
    res.status(200).send({ data: result.rows });
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

