const express=require('express')
const session=require('express-session')
var app=express()
var port=4910
const formidable = require('formidable')
const fs = require('fs')
var dateTime = require('node-datetime');
var bodyParser=require('body-parser')

var member=express()

app.use(bodyParser.urlencoded({
    extended:true
}))

app.set("view engine","ejs")
member.set("view engine","ejs")


member.use(session({
    secret:"member",
    resave:true,
    saveUninitialized:true
}))


app.use("/member",member)

app.use(express.static('upload'));

var memberroute = require("./services/routes-member")

memberroute(member)


app.listen(port,function(err,res){
    if(err){
        console.log("err in starting")
    }
    console.log("server started at:",port)
})