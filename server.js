const express=require('express')
const session=require('express-session')
var app=express()

const formidable = require('formidable')
const fs = require('fs')
var dateTime = require('node-datetime');
var bodyParser=require('body-parser')
require('dotenv').config();
var port=process.env.PORT
var member=express()

var admin=express()
var guest=express()

app.use(bodyParser.urlencoded({
    extended:true
}))

app.set("view engine","ejs")
member.set("view engine","ejs")

admin.set("view engine","ejs")
guest.set("view engine","ejs")

member.use(session({
    secret:"member",
    resave:true,
    saveUninitialized:true
}))

admin.use(session({
    secret:"member",
    resave:true,
    saveUninitialized:true
}))

guest.use(session({
    secret:"member",
    resave:true,
    saveUninitialized:true
}))

app.use("/member",member)

app.use("/admin",admin)
app.use("/guest",guest)

app.use(express.static('upload'));
app.use(express.static('public'));

var memberroute = require("./services/routes-member")

var adminroute = require("./services/routes-admin")
var guestroute = require("./services/routes-guest")

memberroute(member)

adminroute(admin)
guestroute(guest)

app.listen(port,function(err,res){
    if(err){
        console.log("err in starting")
    }
    console.log("server started at:",port)
})