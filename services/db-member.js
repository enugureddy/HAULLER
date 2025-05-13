const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
const fs=require('fs')
//const cloudinary = require('cloudinary').v2
const cloudinary = require('../config/cloudinary')
const { notification } = require('./controller-member')
var url = process.env.MONGO_URI
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

        (async function run() {
            const image = oldPath;
            const result = await cloudinary.uploader.upload(oldPath);
            console.log(`Successfully uploaded ${image}`);
            console.log(`> Result: ${result.secure_url}`);
            var adData = {
                'id' : id,
                'name' : name,
                'description' : description,
                'price': price,
                'image' : result.secure_url,
                'timestamp' : timestamp,
                'adDateTime' : currentDateTime
            }
            collection.insertOne(adData)
          })();

        //insert to db
    
         //new id generated //_id.exten ::: for eg: 123123123123.png
        //u want to show a full details of ad
        //ip: ad._id
        //u can get the advertise detail from db using ad id
        //retrieved ad, u can get ad.image (extension)
        //_id.extension

        // var newFileNameName = "./public/media/" + adId + "." + extension;

        // //read
        // fs.readFile(oldPath, function(err, data){
        //     if(err)
        //     {
        //         console.log("Error in upload : ", err)
        //         return
        //     }
        //     //write
        //     fs.writeFile(newFileNameName, data, function(err){
        //         if(err)
        //         {
        //             console.log("Error in upload2 : ", err)
        //             return   
        //         }
        //     })
        // })

        /*
        if( extension === 'png' || extension === 'jpg' )
        {
            var newFileName = __dirname + "/media/" + files.adimage.originalFilename;
        }
        */
    })

}
async function insertNotification(req)
{
    console.log("inside controller")
    //getting collection
    var collection = db.collection("member_notifications")

    
        //collecting information about the file upload
      

        //adding text to db
   
       
            var notiData = {
userId: req.body.userId, // assuming this is provided
  title: req.body.title || "New Notification",
  message: req.body.message || "You have a new notification.",
  isRead: false,
  createdAt: new Date(),
    adId:req.body.adId // manual
            }
            
            const result = await collection.insertOne(notiData);
    return result;
          }

        //insert to db
    
         //new id generated //_id.exten ::: for eg: 123123123123.png
        //u want to show a full details of ad
        //ip: ad._id
        //u can get the advertise detail from db using ad id
        //retrieved ad, u can get ad.image (extension)
        //_id.extension

        // var newFileNameName = "./public/media/" + adId + "." + extension;

        // //read
        // fs.readFile(oldPath, function(err, data){
        //     if(err)
        //     {
        //         console.log("Error in upload : ", err)
        //         return
        //     }
        //     //write
        //     fs.writeFile(newFileNameName, data, function(err){
        //         if(err)
        //         {
        //             console.log("Error in upload2 : ", err)
        //             return   
        //         }
        //     })
        // })

        /*
        if( extension === 'png' || extension === 'jpg' )
        {
            var newFileName = __dirname + "/media/" + files.adimage.originalFilename;
        }
        */
    


// function insertimg(req, form,cid)
// {
//     console.log("inside controller img")
//     //getting collection
//    // var collection = db.collection("add")

//     form.parse(req, function(err, fields, files){
//         console.log("inside formidable function img")
//         //collecting information about the file upload
//         var oldPath = files.adimage.filepath; //temp location 
//         var extension = files.adimage.originalFilename.split('.').pop()

//         var adId = fields.id //new id generated //_id.exten ::: for eg: 123123123123.png
//         //u want to show a full details of ad
//         //ip: ad._id
//         //u can get the advertise detail from db using ad id
//         //retrieved ad, u can get ad.image (extension)
//         //_id.extension
//         console.log("addid:",adId)

//         var newFileNameName = "./public/media/" + adId + "." + extension;

//         //read
//         fs.readFile(oldPath, function(err, data){
//             if(err)
//             {
//                 console.log("Error in upload : ", err)
//                 return
//             }
//             //write
//             fs.writeFile(newFileNameName, data, function(err){
//                 if(err)
//                 {
//                     console.log("Error in upload2 : ", err)
//                     console.log(newFileNameName)
//                     return   
//                 }
//                 console.log("image updated at:",newFileNameName)

//             })
//         })

//         /*
//         if( extension === 'png' || extension === 'jpg' )
//         {
//             var newFileName = __dirname + "/media/" + files.adimage.originalFilename;
//         }
//         */
//     })

// }

function insertimg(req, form, callback) {
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log("Form parse error:", err);
            return callback("Form parse error");
        }

        const adId = fields.id;
        const file = files.adimage;
        const extension = file.originalFilename.split('.').pop().toLowerCase();

        if (extension !== 'jpg') {
            return callback("Only JPG files are allowed");
        }

        const oldPath = file.filepath;
        const newFileName = "./public/media/" + adId + ".jpg";

        fs.readFile(oldPath, function(err, data) {
            if (err) {
                console.log("Error reading file:", err);
                return callback("Error reading file");
            }

            fs.writeFile(newFileName, data, function(err) {
                if (err) {
                    console.log("Error writing file:", err);
                    return callback("Error writing file");
                }

                console.log("Image updated at:", newFileName);
                callback(null); // success
            });
        });
    });
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
                console.log("Err in database server connection",err)
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
    viewAdds: function(id, res) {
       const addCollection = db.collection("add");
const notificationCollection = db.collection("member_notifications");
const memberCollection = db.collection("member");

const userIdObject = { '_id': mongodb.ObjectId(id) };
const notificationFilter = { 'userId': id };

// Step 1: Fetch all ads
addCollection.find().toArray(function(err, ads) {
    if (err) {
        console.error("Error fetching ads:", err);
        return res.status(500).send("Error fetching ads");
    }

    // Step 2: Fetch user details
    memberCollection.findOne(userIdObject, function(err, user) {
        if (err || !user) {
            console.error("Error fetching user:", err);
            return res.render("member-viewadds", {
                title: "View Page",
                data: ads,
                id: id,
                name: "Unknown User",
                notificationCount: 0
            });
        }

        // Step 3: Count notifications
        notificationCollection.countDocuments(notificationFilter, function(err, count) {
            if (err) {
                console.error("Error counting notifications:", err);
                count = 0;
            }

            // Step 4: Render page with all data
            return res.render("member-viewadds", {
                title: "View Page",
                data: ads,
                id: id,
                name: user.name,
                notificationCount: count
            });
        });
    });
});

        
    },
        notification: function(id, res) {
        var collection = db.collection("member_notifications");
        
            var filter1={
            "userId":id
        }
     
        collection.find(filter1).toArray(function(err, result) {
            if (err) {
                console.log("Err in view");
                return;
            }
    
            var memberCollection = db.collection("member");
            var filter = {
                '_id': mongodb.ObjectId(id)
            };
   
            memberCollection.findOne(filter, function(err, user) {
                if (err || !user) {
                    console.log("Error fetching user or user not found");
                    return res.render("member-viewadds", { 
                        title: "view page", 
                        data: result, 
                        id: id, 
                        name: "Unknown User"
                    });
                }
    
                console.log("User:",result);
                console.log("Current login user ID:", id);
            const formatted = result.map(n => ({
      title: n.title,
      message: n.message,
      timeAgo: getTimeAgo(n.createdAt),
      adId: n.adId,
    }));
    console.log("Formatted notifications:", formatted);
function getTimeAgo(date) {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' hours ago';
  return Math.floor(diff / 86400) + ' days ago';
}
    res.render('member-viewnotifications', { data: formatted, id: id});
            });
        });
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

    module.exports = {dbController,loginmember,insertAd,getbyid,insertimg,insertNotification}