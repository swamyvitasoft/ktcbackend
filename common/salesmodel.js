import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
   
    fullname:{
        type:String,
        required:true 
     },   
     address:{
        type:String,
        required:true 
     },
     mobileno:{
        type:String,
        required:true 
     },
     particulars:{
        type:String,
        required:true 
     },
     items:{
        type:String,
        required:true 
     },
     imei:{
        type:String,
        required:true 
     },
     estimated:{
        type:String,
        required:true 
     },
     advance:{
        type:String,
        required:true 
     },
     balance:{
        type:String,
        required:true 
     }
},
{timestamps:true}
);

const Salemodel = mongoose.model('sale',saleSchema);

export default Salemodel