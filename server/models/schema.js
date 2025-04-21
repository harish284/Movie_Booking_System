const mon=require('mongoose');

const booking=new mon.Schema({
    username:String,
    email:String,
    password:String,
    role: { type: String, enum: ["user", "admin"], required: true }
})

const register=mon.model("register",booking);

module.exports={register};