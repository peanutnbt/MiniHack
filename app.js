const express= require("express");
const exphbs  = require("express-handlebars");
const bodyParser=require("body-parser")

let app= express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
var hbs = exphbs.create({//khai báo helper cho handlebars
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
                helpers: {//tạo helper viết function xử lý biến cho handlebars play
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

app.post("/game/:gameId",(req,res)=>{
    GameModel.findById(req.params.gameId,(err,resFind)=>{
        let currentRound=resFind.Round.length;
        console.log(req.body)
        console.log(req.body.numberOfRound)
        console.log(currentRound)
        if(req.body.numberOfRound>currentRound){
            var newRound=resFind.Round[currentRound-1].round+1;
            var Roundadd={"pa":req.body.score1,"pb":req.body.score2,"pc":req.body.score3,"pd":req.body.score4,"round":newRound}   
            resFind.Round.push(Roundadd)
        }
        else{
            var newRound=resFind.Round[currentRound-2].round+1;
            var Roundadd={"pa":req.body.score1,"pb":req.body.score2,"pc":req.body.score3,"pd":req.body.score4,"round":newRound}
            
            resFind.Round.pop()
            resFind.Round.push(Roundadd)
        }
        
        GameModel.update({_id:req.params.gameId},{$set: {Round:resFind.Round}},function(err,doc){
            if(err){
                res.status(201).send({success:0,errMsg:err})
            }
            else res.status(201).send({success:1})
        })
            
    })
})
app.use(express.static("./public"));
app.listen(9999,function(err){
    if(err) console.log(err)
    else console.log(" Connect")
});



