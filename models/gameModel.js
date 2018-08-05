const mongoose = require("mongoose")
const Schema = mongoose.Schema

let GameSchema = new Schema({
    numberRound: {type: Number , default: 1},
    name: {type: Array},
    Round: {type: [[]] ,default:null}
    
})
module.exports=mongoose.model("Game",GameSchema)