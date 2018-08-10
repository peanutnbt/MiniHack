const mongoose = require("mongoose")
const Schema = mongoose.Schema

var InnerArray = new mongoose.Schema({
  round:  {type:Number},
  pa:{type:Number,default:0},
  pb:{type:Number,default:0},
  pc:{type:Number,default:0},
  pd:{type:Number,default:0}
  })
  
let GameSchema = new Schema({ 
    name: {type: Array},
    Round: {type:[InnerArray]},
    sumA:{type:Number,default:0},
    sumB:{type:Number,default:0},
    sumC:{type:Number,default:0},
    sumD:{type:Number,default:0},
})
module.exports=mongoose.model("Game",GameSchema)