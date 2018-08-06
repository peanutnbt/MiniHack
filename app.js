const express= require("express");
const exphbs  = require("express-handlebars");
const bodyParser=require("body-parser")

let app= express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
var hbs = exphbs.create({
    helpers: {
        times:function () { return null; },
        plus:function () { return null; }
    }
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GameMiniHack',{useNewUrlParser:true},function(err){
    if(err) console.log(err);
    else console.log("DB connect success");
});
const GameModel=require("./models/gameModel")

app.get("/",(req,res)=>{
    res.render("add");
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post("/",(req,res)=>{
    let name=[req.body.user1,req.body.user2,req.body.user3,req.body.user4];
    let newGame={name:name,Round:[{"round":"1","pa":"5","pb":"6","pc":"1","pd":"-4"},{"round":"2","pa":"2","pb":"6","pc":"1","pd":"-6"}]};
    GameModel.create(newGame,function(err,GameCreated){//questionCreated: la cai vua duoc tao ra newQs
        if(err) res.status(500).send({success:0,errMsg:err})
        else {
            res.status(201).send({success:1,gameId:GameCreated._id})
        }
        
    })
    
})
app.get("/game/:gameId",(req,res)=>{
    GameModel.findById(req.params.gameId,(err,resFind)=>{
        if(err) console.log(err)
        else{
            res.render("play",{
                game: resFind,
                helpers: {
                    times: function(n, block) {
                        var accum = '';
                        for(var i = 0; i <= n; ++i)
                            accum += block.fn(i);
                        return accum;
                    },
                    plus: function(n){
                        return parseInt(n)+1;
                    },
                    sumA: function(round){
                        var sum=0;
                        round.forEach(function(item,index){
                            sum+=item.pa;
                        })
                        return sum
                    },
                    sumB: function(round){
                        var sum=0;
                        round.forEach(function(item,index){
                            sum+=item.pb;
                        })
                        return sum
                    },sumC: function(round){
                        var sum=0;
                        round.forEach(function(item,index){
                            sum+=item.pc;
                        })
                        return sum
                    },sumD: function(round){
                        var sum=0;
                        round.forEach(function(item,index){
                            sum+=item.pd;
                        })
                        return sum
                    }
                }
            })
        }
    })
})
// app.post("/game/:gameId",(req,res)=>{
//     console.log(req.params.gameId)
//     GameModel.findById(req.params.gameId,(err,resFind)=>{
//         let currentROund=resFind.Round.length;
//         console.log(currentROund)
//         QuestionModel.update({_id:req.params.gameId},{$set: {Round:[currentROund][req.body.score1,req.body.score2,req.body.score3,req.body.score4]}})
//     })
     
// })
app.use(express.static("./public"));
app.listen(9999,function(err){
    if(err) console.log(err)
    else console.log(" Connect")
});



