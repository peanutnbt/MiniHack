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
    let newGame={name:name};
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
        resFind.sumA=0;resFind.sumB=0;;resFind.sumC=0;resFind.sumD=0
        if(req.body.numberOfRound>currentRound){
            var newRound
            if(currentRound==0)
                newRound=1;
            else newRound=req.body.numberOfRound
            var Roundadd={"pa":req.body.score1,"pb":req.body.score2,"pc":req.body.score3,"pd":req.body.score4,"round":newRound}   
            resFind.Round.push(Roundadd)
            console.log(req.body.numberOfRound)
            console.log(newRound)
            console.log(Roundadd)
            resFind.Round.forEach(function(item,index){
                resFind.sumA+=item.pa;
                resFind.sumB+=item.pb;
                resFind.sumC+=item.pc;
                resFind.sumD+=item.pd;
            })
        }
        else{//neu so round hien tai client nho hon bang Round.length,//lan thu 2 input
            var newRound=req.body.numberOfRound
            var Roundadd={"pa":req.body.score1,"pb":req.body.score2,"pc":req.body.score3,"pd":req.body.score4,"round":newRound}
            resFind.Round.pop()
            resFind.Round.push(Roundadd)
            console.log(req.body.numberOfRound)
            console.log(newRound)
            console.log(Roundadd)
            resFind.Round.forEach(function(item,index){
                resFind.sumA+=item.pa;
                resFind.sumB+=item.pb;
                resFind.sumC+=item.pc;
                resFind.sumD+=item.pd;
            })
        }
        
        GameModel.update({_id:req.params.gameId},{$set: {Round:resFind.Round},sumA:resFind.sumA,sumB:resFind.sumB,sumC:resFind.sumC,sumD:resFind.sumD},function(err,doc){
            if(err){
                res.status(201).send({success:0,errMsg:err})
            }
            else res.status(201).send({success:1,sumA:resFind.sumA,sumB:resFind.sumB,sumC:resFind.sumC,sumD:resFind.sumD})
        })
            
    })
}) 
app.use(express.static("./public"));
app.listen(9999,function(err){
    if(err) console.log(err)
    else console.log(" Connect")
});



