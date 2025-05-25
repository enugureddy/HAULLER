const mongodb = require('mongodb');
const dbController = require("./db-member")
const emailController = require("./mail-service")
const formidable = require('formidable')
const fs = require('fs')
const { getDb } = require("./db-member");

dbController.dbController.connection()
var currlogin


var controller ={
    login : function(req,res){

        res.render("member-login",{title : "Member Login Page",data : null})
    },
    loginverify : async function(req,res){
        var email = req.body.email
        var password = req.body.password

        if (!email || !password || !email.includes("@") || password.length < 6) {
            return res.status(400).send("Invalid input");
        }

        var data = await dbController.loginmember(email, password)
       
      
        if (data != null)
        {    req.session.member = data
           
           // res.render("member-viewadds", {title : "Member Home Page", data : data})
console.log("currentloginuser:",req.session.member._id.toString())
            res.redirect("/member/viewadds")
        }
        else
        {
            return res.status(401).render("member-login", {title : "Member Login Page", errorMsg: "Invalid Credentials"})
        }
    },
    register : function(req,res){
        res.render("member-register",{title : "Member Register Page"})
    },

    registerpost : async function(req,res){
      
        console.log("inside register function")
        var form = new formidable.IncomingForm();
        dbController.insertmem(req,form) 
        var data = currlogin
       await res.redirect("/member")

       
    },
    
    forgotpassword : function(req, res){
        res.render("member-forgotpassword", {title : "member Forgot Password Page"})
    },

    sendpassword : async function(req, res){
        var email = req.body.email
        var user = await dbController.dbController.getUserByEmail(email)
        if( user == null )
        {
            res.send("Invalid email address")
        }
        else{
            var password = user.password
            var name = user.name
            console.log("password:", password)
            //send this email
            emailController.send(email, "thirumalreddyenugu@gmail.com", "Password Recovery", "Dear "+name+" , your password is  " + "<b>" + "" + password + "</b>")
            res.render("member-login", {title : "member Login Page"})
        }
    },
    viewadds : function(req,res){
        var id= req.session.member._id.toString()
         
        dbController.dbController.viewAdds(id,res)
    },

    incrementContactClicks: async function(req, res) {
        const id = req.params.id;
        const collection = require('./db-member').getDb().collection("add");
        await collection.updateOne({ _id: require('mongodb').ObjectId(id) }, { $inc: { contactClicks: 1 } });
        res.sendStatus(200);
    },

    addToWishlist: async function(req, res) {
        const memberId = req.session.member._id.toString();
        const adId = req.params.adId;

        try {
            await dbController.dbController.addToWishlist(memberId, adId);
            res.redirect("/member/viewadds"); // or redirect back to the same ad page
        } catch (err) {
            console.error("Error adding to wishlist:", err);
            res.status(500).send("Internal Server Error");
        }
    },

    removeFromWishlist: async function(req, res) {
        const memberId = req.session.member._id.toString();
        const adId = req.params.adId;

        try {
            await dbController.dbController.removeFromWishlist(memberId, adId);
            res.redirect("/member/favourites"); // redirect back to wishlist page
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            res.status(500).send("Internal Server Error");
        }
    },


    // viewWishlist: async function(req, res) {
    //     const memberId = req.session.member._id.toString();
    //     const wishlistCollection = dbController.getDb().collection("member_wishlist");
    //     const adCollection = dbController.getDb().collection("add");

    //     try {
    //         const wishlistItems = await wishlistCollection.find({ memberId }).toArray();
    //         const adIds = wishlistItems.map(item => new mongodb.ObjectId(item.adId));
    //         const ads = await adCollection.find({ _id: { $in: adIds } }).toArray();

    //         res.render("member-wishlist", {
    //             title: "Your Favorites",
    //             data: ads,
    //             id: memberId
    //         });
    //     } catch (err) {
    //         console.error("Error loading wishlist:", err);
    //         res.status(500).send("Failed to load wishlist");
    //     }
    // },

    viewFavourites: async function(req, res) {
        const memberId = req.session.member._id.toString();
        const wishlistCollection = require('./db-member').getDb().collection("member_favorites");
        const adCollection = require('./db-member').getDb().collection("add");
        const memberCollection = require('./db-member').getDb().collection("member");
        // const notificationCollection = dbController.getDb().collection("member_notifications");

        try {
            const favs = await wishlistCollection.find({ memberId }).toArray();
            const adIds = favs.map(f => new mongodb.ObjectId(f.adId));
            const ads = await adCollection.find({ _id: { $in: adIds } }).toArray();
            ads.forEach(ad => ad.isWishlisted = true);

            const member = await memberCollection.findOne({ _id: new mongodb.ObjectId(memberId) });
            // const count = await notificationCollection.countDocuments({ userId: memberId });

            res.render("member-viewfavourites", {
                title: "Your Wishlist",
                data: ads,
                id: memberId,
                name: member.name,
                image: member.image || '/media/default-user.png',
                notificationCount: 0
            });
        } catch (err) {
            console.error("❌ Error loading favourites:", err.stack || err);
            res.status(500).send("Something went wrong");
        }
    },



    notification : function(req,res){
        var id= req.session.member._id.toString()
        dbController.dbController.notification(id,res);
    },
   
    uploadView : function(req, res){
       // if( req.session.loginuserId )
       // {
            res.render("staff-upload-view", {title : "Form with upload"})
      //  }
       // else
       // {
       //     res.render("member-login", {title : "user Login Page"})
       // }
    },
    updateimg : async function(req, res){
        // if( req.session.loginuserId )
            var id=req.params.id
         await    res.render("staff-upload-view1", {title : "Form with upload",id:id})
       //  }
        // else
        // {
        //     res.render("member-login", {title : "user Login Page"})
        // }
     },
    uploadAction : async function(req, res){
        var id=req.session.member._id.toString()
        console.log("inside controller function")
        var form = new formidable.IncomingForm();
        dbController.insertAd(req, form,id) 
        var data = currlogin
        // req.session.loginuserId 
        // req.session.loginuserEmail 
       // res.render("member-viewadds", {title: "user home page", data: data })
    await res.redirect("/member/viewadds")
    },
        addnotification : async function(req, res){
        var id=req.session.member._id.toString()
        console.log("inside controller function of notifiction",req.body,id)
       // var form = new formidable.IncomingForm();
 
        dbController.insertNotification(req) 

        var data = currlogin
        // req.session.loginuserId 
        // req.session.loginuserEmail 
       // res.render("member-viewadds", {title: "user home page", data: data })
    await res.redirect("/member/viewadds")
    },
    // updateimgpost : async function(req, res){
    //     //var cid = req.body.id
    //     console.log("id:",)
    //     console.log("inside controller function img")
    //     var form = new formidable.IncomingForm();
    //     dbController.insertimg(req, form,) 
    //   //  var data = currlogin
    //     // req.session.loginuserId 
    //     // req.session.loginuserEmail 
    //    // res.render("member-viewadds", {title: "user home page", data: data })
    // await res.redirect("/member/viewadds")
    // },

    updateimgpost: async function(req, res) {
        var form = new formidable.IncomingForm();
    
        dbController.insertimg(req, form, function(err) {
            if (err) {
                console.log("Image upload error:", err,req.body.id);
                return res.render("staff-upload-view1", {
                    title: "Add Advertisement",
                    errorMsg: err,
                    id: req.body.id
                });
            }
    
            // On success
            res.redirect("/member/viewadds");
        });
    }
,    

    delete :function(req,res,id){
        var id = req.params.id
        dbController.dbController.deleteadd(id,res)
    },
     deletenot :function(req,res,id){
        var id = req.params.id
        dbController.dbController.deletenot(id,res)
    },
    dadd :function(req,res,id){
        var id = req.session.member._id.toString()
        dbController.dbController.dadd(id,res)
    },
     dnot :function(req,res,id){
        var id = req.session.member._id.toString()
        dbController.dbController.dnot(id,res)
    },
    dacc :function(req,res,id){
        var id = req.session.member._id.toString()
        dbController.dbController.dacc(id,res)
    },
    uacc : function(req,res){
        var id = req.session.member._id.toString()
        dbController.dbController.uacc(id,res)
    },
    uaccpost : function(req,res){
        dbController.dbController.uaccpost(req,res)
        console.log("Data Updated")
        res.redirect("/member")
    },
    

    updatedet : function(req,res){
        var id = req.params.id
        dbController.dbController.updatedet(id,res)
    },
    updatedetpost : function(req,res){
        dbController.dbController.updatedetpost(req,res)
        console.log("Data Updated")
        res.redirect("/member/viewadds")
    },

view:async function(req,res){
var id=req.params.id
 var ad= await dbController.getbyid(id)
 if(ad!= null){
 var imageurl="/media/"+ad._id+"."+ad.image
 console.log("image:",imageurl)
 res.render("ad-view",{data:ad,imageurl:imageurl})}
 else{
     res.render("member-viewadds")
 }
},

    chat: function(req,res){
        // var id=req.query.otherId;
        // console.log("id:",id)
        dbController.dbController.retrieveusers(req.session.member._id,res)
       
},
search : function(req,res){
    //var   aname = name
    var id= req.session.member._id.toString()
  var zname=req.query.name
     dbController.dbController.smemberadds(id,zname,res)
  },



    logout : function(req, res){
        req.session.destroy( function(err){
            if (err) {
                console.log('Logout error:', err);
                return res.status(500).send('Error logging out');
              }
            console.log("session destroyed")
        })  
        res.render("member-login", {title : "Member Login Page"})
    },
}

    module.exports = controller