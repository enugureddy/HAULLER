const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
const fs=require('fs')
var url = "mongodb://localhost:27017"
var db;

function loginmember(email,password){

    var collection =db.collection("member")
    var filter={
        "email":email,
        "password":password
    }
    var userData=collection.findOne(filter)
    return userData;
}

function insertAd(req, form,id)
{
    console.log("inside controller")
    //getting collection
    var collection = db.collection("add")

    form.parse(req, function(err, fields, files){
        console.log("inside formidable function")
        //collecting information about the file upload
        var oldPath = files.adimage.filepath; //temp location 
        var extension = files.adimage.originalFilename.split('.').pop()

        //adding text to db
        var name = fields.name
        var description = fields.description
        var price=fields.price
 
        console.log("name : ", name)
        console.log("description : ", description)
        console.log("price :",price)

        //preparing time informartion
        var timestamp = Date.now();
        var currentDateTime = new Date();  

        //insert to db
        var adData = {
            'id' : id,
            'name' : name,
            'description' : description,
            'price': price,
            'image' : extension,
            'timestamp' : timestamp,
            'adDateTime' : currentDateTime
        }
        collection.insertOne(adData)
        var adId = adData._id //new id generated //_id.exten ::: for eg: 123123123123.png
        //u want to show a full details of ad
        //ip: ad._id
        //u can get the advertise detail from db using ad id
        //retrieved ad, u can get ad.image (extension)
        //_id.extension

        var newFileNameName = "./public/media/" + adId + "." + extension;

        //read
        fs.readFile(oldPath, function(err, data){
            if(err)
            {
                console.log("Error in upload : ", err)
                return
            }
            //write
            fs.writeFile(newFileNameName, data, function(err){
                if(err)
                {
                    console.log("Error in upload2 : ", err)
                    return   
                }
            })
        })

        /*
        if( extension === 'png' || extension === 'jpg' )
        {
            var newFileName = __dirname + "/media/" + files.adimage.originalFilename;
        }
        */
    })

}
function insertimg(req, form,cid)
{
    console.log("inside controller img")
    //getting collection
   // var collection = db.collection("add")

    form.parse(req, function(err, fields, files){
        console.log("inside formidable function img")
        //collecting information about the file upload
        var oldPath = files.adimage.filepath; //temp location 
        var extension = files.adimage.originalFilename.split('.').pop()

        var adId = fields.id //new id generated //_id.exten ::: for eg: 123123123123.png
        //u want to show a full details of ad
        //ip: ad._id
        //u can get the advertise detail from db using ad id
        //retrieved ad, u can get ad.image (extension)
        //_id.extension
        console.log("addid:",adId)

        var newFileNameName = "./public/media/" + adId + "." + extension;

        //read
        fs.readFile(oldPath, function(err, data){
            if(err)
            {
                console.log("Error in upload : ", err)
                return
            }
            //write
            fs.writeFile(newFileNameName, data, function(err){
                if(err)
                {
                    console.log("Error in upload2 : ", err)
                    console.log(newFileNameName)
                    return   
                }
                console.log("image updated at:",newFileNameName)

            })
        })

        /*
        if( extension === 'png' || extension === 'jpg' )
        {
            var newFileName = __dirname + "/media/" + files.adimage.originalFilename;
        }
        */
    })

}
 function getbyid(id)
 {
     var collection=db.collection("add")
     var filter={
         '_id':mongodb.ObjectId(id)
     }
     var ad =collection.findOne(filter)
     return ad
 }


var dbController = {
    connection : function(){
        mongoClient.connect(url, function(err, database){
            if(err)
            {
                console.log("Err in database server connection")
                return
            }
            db = database.db("hauller")
            console.log("DB Connected from member")
        })
    },
    addmember : function(data){
        var collection = db.collection("member")
        collection.insertOne(data, function(err,result){
            if(err){
                console.log("Err in adding")
                return
            }
            console.log("Added")
        })
    },
    viewAdds : function(id,res){
        var collection = db.collection("add")
        var filter1={
            "id":id
        }
        collection.find(filter1).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("member-viewadds", {title: "view page", data : result})
        })
    },
    deleteadd : function(id,res){
        var collection = db.collection("add")
        var filter = {
            "_id" : mongodb.ObjectId(id)
        }
        collection.deleteOne(filter,function(err,data){
            if(err){
                console.log("Err while deleting add")
            }
        })
        res.redirect("/member/viewadds")
       // res.render("staff-viewusers", {title: "view page"})
    },
    dadd : function(id,res){
        var collection = db.collection("add")
        var filter = {
            "id" : id
        }
        collection.deleteMany(filter,function(err,data){
            if(err){
                console.log("Err while deleting adds")
            }
        })
        res.redirect("/member/viewadds")
       // res.render("staff-viewusers", {title: "view page"})
    },
    dacc : function(id,res){
        var collection = db.collection("member")
        var filter = {
            "_id" : mongodb.ObjectId(id)
        }
        collection.deleteOne(filter,function(err,data){
            if(err){
                console.log("Err while deleting acc")
            }
        })
        res.redirect("/member/")
       // res.render("staff-viewusers", {title: "view page"})
    },
  


    getUserByEmail : function(email){
        var collection = db.collection("member")
        var filter = {
            "email" : email
        }
        var userData = collection.findOne(filter)
        return userData
    },
    updatedet: function(id,res){
        var collection = db.collection("add")
         
        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id" : newId
        }
        var stdata = null
          
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
           res.render("member-updatedet" , {data:stdata})
        })
    },

   
    uadd: function(id,res){
        var collection = db.collection("add")
         
        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id" : newId
        }
        var stdata = null
          
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
           res.render("member-updatedet" , {data:stdata})
        })
    },

    updatedetpost : function(req,res){
        var id = req.body.id
        var name = req.body.name
        var description = req.body.description
        var price = req.body.price

        var frtdata = {
            $set :  {
              //  "_id":id,
                "name" : name,
                "description" : description,
                "price" : price,
            }
        }
       
        var whereclause = {
            "_id" : mongodb.ObjectId(id)
        }
        var collection = db.collection("add")
    
        collection.updateMany(whereclause, frtdata, function(err, data){
            if(err)
            {
                console.log("Err in update : ", err)
                return
            }
            
        })
    },

    uacc: function(id,res){
        var collection = db.collection("member")
         
        var newId = mongodb.ObjectId(id)
        var filter = {
            "_id" : newId
        }
        var stdata = null
          
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in updating")
                return
            }
            result.forEach(element => {
                stdata = element
            })
           res.render("member-updateacc" , {data:stdata})
        })
    },

    uaccpost : function(req,res){
        var id = req.body.id
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password

        var frtdata = {
            $set :  {
              //  "_id":id,
                "name" : name,
                "email" : email,
                "password" : password,
            }
        }
       
        var whereclause = {
            "_id" : mongodb.ObjectId(id)
        }
        var collection = db.collection("member")
    
        collection.updateOne(whereclause, frtdata, function(err, data){
            if(err)
            {
                console.log("Err in update : ", err)
                return
            }
            console.log("user updated")
            
        })
    },




}

    module.exports = {dbController,loginmember,insertAd,getbyid,insertimg}