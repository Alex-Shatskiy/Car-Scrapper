const {client,db} = require('./db')
const coventryCars = require("./webscraper/coventryCars")
const autoWorld = require('./webscraper/autoWorld')
client.connect()
const pgp = require('pg-promise')();

let aw


async function coventryCarsScraper (dbType, col){
      let data 
    switch(dbType){
      case ("conventrycars" ):
            data= await coventryCars.coventryCars("https://www.coventrycars.co.nz/vehicles?");
            break
      case "autoworld":
            data = await autoWorld.autoWorld("https://www.autoworld.co.nz/vehicles")
            break
      default:
            console.log("Ohh oooo")
    }
   

   
      const cs = new pgp.helpers.ColumnSet([`${col}_carname`, `${col}_price`, `${col}_km`, `${col}_cc`, `${col}_type`, `${col}_transmission`, `${col}_carimage`, `${col}_pageurl`], { table: `${dbType}` });
      const values = data.map(da => ({ [`${col}_carname`]: da[`${col}_carname`], [`${col}_price`]: da[`${col}_price`], [`${col}_km`]: da[`${col}_km`], [`${col}_cc`]: da[`${col}_cc`], [`${col}_type`]: da[`${col}_type`], [`${col}_transmission`]: da[`${col}_transmission`], [`${col}_carimage`]: da[`${col}_carimage`], [`${col}_pageurl`]: da[`${col}_pageurl`] }));
      
      const query = `
      INSERT INTO ${dbType} (${col}_carname, ${col}_price, ${col}_km, ${col}_cc, ${col}_type, ${col}_transmission, ${col}_carimage, ${col}_pageurl)
      SELECT $1, $2, $3, $4, $5, $6, $7, $8
      WHERE NOT EXISTS (
          SELECT * FROM ${dbType} WHERE ${col}_carname = $1 AND ${col}_price = $2 AND ${col}_km = $3 AND ${col}_cc = $4 AND ${col}_type = $5 AND ${col}_transmission = $6 AND ${col}_carimage = $7 AND ${col}_pageurl = $8
      );
      `;
      
      // Delete rows that are not in the data array
      const sql = `DELETE FROM ${dbType} WHERE ${col}_carname NOT IN (${values.map((_, i) => `$${i + 1}`).join(', ')})`;
      const values1 = data.map(obj => obj[`${col}_carname`]);
        client.query(sql, values1);
      // Insert rows that don't exist in the database
      for (let i = 0; i < values.length; i++) {
          await db.none(query, [values[i][`${col}_carname`], values[i][`${col}_price`], values[i][`${col}_km`], values[i][`${col}_cc`], values[i][`${col}_type`], values[i][`${col}_transmission`], values[i][`${col}_carimage`], values[i][`${col}_pageurl`]]);
      }
      console.log("Success!")
      await client.end();

}

coventryCarsScraper('autoworld', 'aw')

