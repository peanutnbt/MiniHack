const mongoose = require("mongoose")
const Schema = mongoose.Schema

var InnerArray = new mongoose.Schema({
  round:  Number,
  pa:{type:Number,default:0},
  pb:{type:Number,default:0},
  pc:{type:Number,default:0},
  pd:{type:Number,default:0}
  })
  
let GameSchema = new Schema({ 
    name: {type: Array},
    Round: [InnerArray]
})
module.exports=mongoose.model("Game",GameSchema)