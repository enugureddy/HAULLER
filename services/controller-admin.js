const dbController = require("./db-admin")
const emailController = require("./mail-service")

dbController.dbController.connection()

var currentuser
var controller ={
    login : function(req,res){
        res.render("admin-login",{title : "admin Login Page",data : null})
    },
    loginverify : async function(req,res){
        var email = req.body.email
        var password = req.body.password

        var data = await dbController.loginadmin(email, password)
        if (data != null)
        {   
            res.redirect("/admin/viewmembers")
           // res.render("admin-viewmember", {title : "admin Home Page", data : data})
        }
        else
        {
            res.render("admin-login", {title : "admin Login Page"})
        }
    },
  
    viewmemberadds : function(req,res){
        var id = req.params.id
        currentuser= id
        dbController.dbController.viewmemberadds(id,res)
    },
    view:async function(req,res){
        var id=req.params.id
         var ad= await dbController.getbyid(id)
         if(ad!= null){
         var imageurl="/media/"+ad._id+"."+ad.image
         console.log("image:",imageurl)
         res.render("ad-view-a",{data:ad,'imageurl':imageurl})}
         else{
             res.render("admin-viewadds")
         }
        },
        viewmembers : function(req,res){
            dbController.dbController.viewmembers(res)
        },
        request : function(req,res){
            var id =req.params.id
           // console.log(id)
            dbController.dbController.request(id,res)
        },
        requestpost:function(req,res){
            var id =req.params.id
            var description=req.body.description
            var email=req.body.email
            mailbody="hi"+ +"<br>the admin has requested more information about the add with id:"+id+" you have created. "+description+" kindly login and check the updates "
            emailController.send(email,"thirumalreddyenugu@gmail.com","Action required for ad- Admin",mailbody)
            res.redirect("/admin/viewmemberadds/:id")

        },
        back : function(req, res){
   
            res.redirect("/viewmembers")
        },
    

    logout : function(req, res){
        req.session.destroy( function(err){
            console.log("session destroyed")
        })  
        res.render("admin-login", {title : "Member Login Page"})
    },}

    module.exports = controller