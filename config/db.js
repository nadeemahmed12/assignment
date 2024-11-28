const mongoose=require('mongoose');

//function mongodb database connection
const connectDb=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database:${connection.connection.host}`)

    }catch(error){
    console.log("DB Error",error);
}
};

module.exports=connectDb;

