const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server); // ✅ correct socket.io setup

const session=require('express-session')
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
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
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

const userSockets = {};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on('register-user', (userId) => {
        userSockets[userId] = socket.id;
        console.log("Registered user:", userId, "with socket:", socket.id);
    });

    socket.on('contact-owner', ({ fromUser, toUser, adId ,itemname,username}) => {

        const targetSocket = userSockets[toUser];
        if (targetSocket) {
            io.to(targetSocket).emit('notify', {
                message: `User ${username} with user id ${fromUser} is interested in your ad #${itemname} with id ${adId}`,
            });
        }
    });

    socket.on('disconnect', () => {
        for (let userId in userSockets) {
            if (userSockets[userId] === socket.id) {
                delete userSockets[userId];
                break;
            }
        }
        console.log("User disconnected:", socket.id);
    });
});



server.listen(port,'0.0.0.0',function(err,res){
    if(err){
        console.log("err in starting")
    }
    console.log("server started at:",port)
})