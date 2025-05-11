const dbController = require("./db-guest")
const emailController = require("./mail-service")

dbController.dbController.connection()

var controller ={

    enter : function(req,res){
        // var id = req.params.id
        // dbController.dbController.viewmemberadds(res)
        res.render("guest-login")
     },
  
    login : function(req,res){
        // var id = req.params.id
         dbController.dbController.viewmemberadds(res)
     },
     view:async function(req,res){
        var id=req.params.id
         var ad= await dbController.getbyid(id)
         if(ad!= null){
         var imageurl="/public/media/"+ad._id+"."+ad.image
         console.log("image:",imageurl)
         res.render("ad-view-g",{data:ad,imageurl:imageurl})}
         else{
             res.render("/guest")
         }
        },
        contact : function(req,res){
            var id =req.params.id
            dbController.dbController.contact(id,res)
        },
        contactpost:function(req,res){
            var id=req.params.id
            var description=req.body.description
            var email=req.body.email
            mailbody="hi"+ +"<br>a user  has requested more information about the add with id:"+id+" you have created."+description+" kindly login and check the updates "
            emailController.send(email,"thirumalreddyenugu@gmail.com","Action required for ad- Admin",mailbody)
            res.redirect("/guest")

        },
        logout : function(req, res){
            req.session.destroy( function(err){
                console.log("session destroyed")
            })  
            res.render("guest-login", {title : "Guest Login Page"})
        },
    }

    module.exports = controller