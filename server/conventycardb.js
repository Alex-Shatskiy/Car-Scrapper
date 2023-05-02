const { client, db } = require("./db")
const { masterScrapper } = require("./webscraper/MasterScraper")
const pgp = require("pg-promise")()

client.connect()
let carPages = [
  {
    url: "https://www.coventrycars.co.nz/vehicles?",
    dbType: "conventrycars",
    col: "conc",
  },
  {
    url: "https://www.autoworld.co.nz/vehicles",
    dbType: "autoworld",
    col: "aw",
  },
  {
    url: "https://www.wholesalecarsdirect.co.nz/vehicles",
    dbType: "wholesalecars",
    col: "wc",
  },
  {
    url: "https://www.valuemotors.co.nz/vehicles?",
    dbType: "valuemotors",
    col: "vm",
  },
  {
    url: "https://www.2cheapcars.co.nz/used-vehicles?Dealership=Wellington",
    dbType: "cheapcars",
    col: "cc",
  },
]

async function databaseInsert(url, dbType, col) {
  return await masterScrapper(url, dbType).then (async data =>{
    console.log(data)
    const cs = new pgp.helpers.ColumnSet(
      [
        `${col}_carname`,
        `${col}_price`,
        `${col}_km`,
        `${col}_cc`,
        `${col}_type`,
        `${col}_transmission`,
        `${col}_carimage`,
        `${col}_pageurl`,
      ],
      { table: `${dbType}` }
    )
    const values = data.map((da) => (
      {
      [`${col}_carname`]: da[`${col}_carname`],
      [`${col}_price`]: da[`${col}_price`],
      [`${col}_km`]: da[`${col}_km`],
      [`${col}_cc`]: da[`${col}_cc`],
      [`${col}_type`]: da[`${col}_type`],
      [`${col}_transmission`]: da[`${col}_transmission`],
      [`${col}_carimage`]: da[`${col}_carimage`],
      [`${col}_pageurl`]: da[`${col}_pageurl`],
    }))
    
    const query = `
    INSERT INTO ${dbType} (${col}_carname, ${col}_price, ${col}_km, ${col}_cc, ${col}_type, ${col}_transmission, ${col}_carimage, ${col}_pageurl)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8
    WHERE NOT EXISTS (
        SELECT * FROM ${dbType} WHERE ${col}_carname = $1 AND ${col}_price = $2 AND ${col}_km = $3 AND ${col}_cc = $4 AND ${col}_type = $5 AND ${col}_transmission = $6 AND ${col}_carimage = $7 AND ${col}_pageurl = $8
    );
    `
  
    // Delete rows that are not in the data array
    const sql = `DELETE FROM ${dbType} WHERE ${col}_carname NOT IN (${values
      .map((_, i) => `$${i + 1}`)
      .join(", ")})`
    const values1 = data.map((obj) => obj[`${col}_carname`])
    client.query(sql, values1)
    // Insert rows that don't exist in the database
    for (let i = 0; i < values.length; i++) {
      await db.none(query, [
        values[i][`${col}_carname`],
        values[i][`${col}_price`],
        values[i][`${col}_km`],
        values[i][`${col}_cc`],
        values[i][`${col}_type`],
        values[i][`${col}_transmission`],
        values[i][`${col}_carimage`],
        values[i][`${col}_pageurl`],
      ])
    }
    console.log("Success!")
    return
  })
}

async function main() {
  for (let page of carPages) {
    console.log(page)
    await databaseInsert(page.url, page.dbType, page.col) 
    console.log("completed: "+ page.dbType)
  }
}

main().then(()=>{
  console.log("all done c:")
  client.end()
  return
})

