const conventrycars = require('./conventycardb')

async function updateDB(){
   try{
      conventrycars()

   }catch(err){
      console.log("ERROR: ", err)
   }finally{
      console.log("completed")

   }

}