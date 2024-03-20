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
     estimatedamount:{
        type:String,
        required:true 
     },
     advanceamount:{
        type:String,
        required:true 
     },
     balaceamount:{
        type:String,
        required:true 
     }
},
{timestamps:true}
);

const Salemodel = mongoose.model('sale',saleSchema);

export default Salemodel