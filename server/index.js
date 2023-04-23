const express = require("express")
const carsCheap = require("./webscraper/carsCheap")
const wholeSale = require("./webscraper/wholeSaleCar")
const autoWorld = require("./webscraper/autoWorld")
const coventryCars = require("./webscraper/coventryCars")
const valueMotors = require("./webscraper/valueMotors")

const app = express()
const port = 5000

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://car-scrapper.onrender.com") // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

// app.get("/", (req, res) => {
//   res.send("Hello World!")
// })carsCheap/optimal

app.get("/", async (req, res) => {
  return res.json({ Data: "HELLO WORLD" })
})

app.get("/carsCheap/more", async (req, res) => {
  return await carsCheap
    .getText(
      "https://www.2cheapcars.co.nz/used-vehicles?MinYear=2013&MaxPrice=21000&Transmission=Automatic&Dealership=Wellington"
    )
    .then((data) => {
      res.json({ cars: data })
    })
})

app.get("/wholeSale/optimal", async (req, res) => {
  let carData = await wholeSale.wholeSale(
    "https://www.wholesalecarsdirect.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=15600&YearFrom=2015&YearTo=0&Transmission=&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=0&EngineSizeTo=0&OdometerFrom=0&OdometerTo=0&Model=&VehicleType=&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPetrol+-+Hybrid&Colour=&PageSize=999"
  )
  res.json({ cars: carData })
})

app.get("/wholeSale/more", async (req, res) => {
  let carData = await wholeSale.wholeSale(
    "https://www.wholesalecarsdirect.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=20600&YearFrom=2013&YearTo=0&Transmission=&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=0&EngineSizeTo=0&OdometerFrom=0&OdometerTo=0&Model=&VehicleType=&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPetrol+-+Hybrid&Colour=&PageSize=999"
  )
  res.json({ cars: carData })
})

app.get("/autoWorld/optimal", async (req, res) => {
  return await autoWorld
    .autoWorld(
      "https://www.autoworld.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=15000&YearFrom=2015&YearTo=0&Transmission=&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=0&EngineSizeTo=0&OdometerFrom=0&OdometerTo=0&Model=&VehicleType=All&IgnoreContext=&FuelType1=&Colour="
    )
    .then((data) => {
      res.json({ cars: data })
    })
    .catch((err) => {
      console.log("whoopsie", err)
    })
})

app.get("/autoWorld/more", async (req, res) => {
  return await autoWorld
    .autoWorld(
      "https://www.autoworld.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=20000&YearFrom=2013&YearTo=0&Transmission=Automatic&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=1500&EngineSizeTo=0&OdometerFrom=0&OdometerTo=0&Model=&VehicleType=All&IgnoreContext=&FuelType1=Hybrid%2cPetrol&Colour="
    )
    .then((data) => {
      res.json({ cars: data })
    })
    .catch((err) => {
      console.log("whoopsie", err)
    })
})

app.get("/coventryCars/optimal", async (req, res) => {
  let carData = await coventryCars.coventryCars(
    "https://www.coventrycars.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=15000&YearFrom=2015&YearTo=0&Transmission=Automatic%2cTiptronic&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=1500&EngineSizeTo=0&OdometerFrom=0&OdometerTo=150000&Model=&VehicleType=All&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPHEV&Colour="
  )
  res.json({ cars: carData })
})

app.get("/coventryCars/more", async (req, res) => {
  let carData = await coventryCars
    .coventryCars(
      "https://www.coventrycars.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=21000&YearFrom=2015&YearTo=0&Transmission=Automatic%2cTiptronic&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=1500&EngineSizeTo=2500&OdometerFrom=0&OdometerTo=190000&Model=&VehicleType=All&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPHEV&Colour="
    )
    .catch((err) => {
      console.log("whoopsie", err)
    })
  res.json({ cars: carData })
})

app.get("/valuemotors/optimal", async (req, res) => {
  let carData = await valueMotors.valueMotors(
    "https://www.valuemotors.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=15000&YearFrom=2015&YearTo=0&Transmission=Automatic%2cTiptronic&BodyStyle=&Dealership=&SortOption=0&Page=1&EngineSizeFrom=1500&EngineSizeTo=0&OdometerFrom=0&OdometerTo=150000&Model=&VehicleType=All&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPetrol+-+H&Colour="
  )
  res.json({ cars: carData })
})

app.get("/valuemotors/more", async (req, res) => {
  let carData = await valueMotors.valueMotors(
    "https://www.valuemotors.co.nz/vehicles?Make=&Text=&PriceFrom=0&PriceTo=21000&YearFrom=2013&YearTo=0&Transmission=Automatic%2cTiptronic&BodyStyle=&Dealership=&SortOption=310&Page=1&EngineSizeFrom=1500&EngineSizeTo=0&OdometerFrom=0&OdometerTo=190000&Model=&VehicleType=All&IgnoreContext=&FuelType1=Hybrid%2cPetrol%2cPetrol+-+H&Colour="
  )
  res.json({ cars: carData })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
