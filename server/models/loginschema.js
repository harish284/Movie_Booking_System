const a=require("mongoose");

const login = new a.Schema({
    email: String,
    password: String
})

const signin=a.model("log", login);
module.exports={signin};