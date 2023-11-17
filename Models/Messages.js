const mongoose = require("mongoose");
const database = require("../database");

const Schema = mongoose.Schema({
    senderEmail:String,
    recieverEmail:String,
    Message:String
})

const Message = mongoose.model("Message", Schema);

module.exports = Message;