const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
const fs=require('fs')
//const cloudinary = require('cloudinary').v2
const cloudinary = require('../config/cloudinary')
const { notification, dnot } = require('./controller-member')
const { log } = require('console')
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

     
    })

}

function extractPublicIdFromUrl(imageUrl) {
  const parts = imageUrl.split('/');
  const filename = parts[parts.length - 1]; // e.g., "ad_12345_1716712345678.jpg"
  const publicId = filename.substring(0, filename.lastIndexOf('.')); // remove .jpg or .png
  return `hauller_ads/${publicId}`;
}


// function insertmem(req, form)
// {
//     console.log("inside dbmember")
//     //getting collection
//     var collection = db.collection("member")

//     form.parse(req, function(err, fields, files){
//     if (err) {
//         console.error("Error parsing the form:", err);
//         return;
//     }


        
//         console.log("inside formidable function")
//         //collecting information about the file upload
//         var oldPath = files.pimage.filepath; //temp location 
//         var extension = files.pimage.originalFilename.split('.').pop()

//         //adding text to db
//         var name = fields.name
//         var email = fields.email
//         var password=fields.password
 
//         console.log("name : ", name)
//         console.log("email : ", email)
//         console.log("password :",password)

 

//   (async function run() {
//             const image = oldPath;
//             const result = await cloudinary.uploader.upload(oldPath);
//             console.log(`Successfully uploaded ${image}`);
//             console.log(`> Result: ${result.secure_url}`);
//             var adData = {
//             'name' : name,
//             'email' : email,
//             'password': password,
//             'image' : result.secure_url,
               
//             }
//             collection.insertOne(adData)
//           })();



      
//     })

// }

function insertmem(req, form) {
    console.log("▶️ Inside insertmem controller");

    let collection;
    try {
        collection = db.collection("member");
    } catch (err) {
        console.error("❌ Failed to get collection:", err);
        return;
    }

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.error("❌ Error parsing form:", err);
            return;
        }

        console.log("📦 Formidable parsing successful");

        // Safely access file
        if (!files.pimage || !files.pimage.filepath) {
            console.error("❌ Image file is missing in the upload");
            return;
        }

        const oldPath = files.pimage.filepath;
        const originalFilename = files.pimage.originalFilename || "";
        const extension = originalFilename.split('.').pop() || "jpg";

        const name = fields.name || "";
        const email = fields.email || "";
        const password = fields.password || "";

        console.log(`🧾 Received fields - Name: ${name}, Email: ${email}, Password: ${password}`);
        console.log(`🖼️ Uploading file from: ${oldPath} (ext: .${extension})`);

        // Async Cloudinary upload and DB insert
        (async function () {
            try {
                const result = await cloudinary.uploader.upload(oldPath);
                console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`);

                const adData = {
                    name: name,
                    email: email,
                    password: password,
                    image: result.secure_url
                };

                const insertResult = await collection.insertOne(adData);
                console.log("✅ Data inserted into MongoDB:", insertResult.insertedId);

            } catch (uploadErr) {
                console.error("❌ Error during Cloudinary upload or MongoDB insert:", uploadErr);
            }
        })();
    });
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

function insertimg(req, form,id, callback) {
   const collection = db.collection("add");

  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.error("Form parsing error:", err);
      return callback("Form parsing error");
    }

    try {
      const file = files.adimage;
      if (!file || !file.filepath || !file.originalFilename) {
        return callback("No image file found");
      }

     

      // Fetch the ad to get old image URL
      const ad = await collection.findOne({ '_id':mongodb.ObjectId(id) });
      console,log("Ad fetched:", ad);
      if (!ad) {
        return callback("Advertisement not found");
      }

      if (ad.imageUrl) {
        const publicId = extractPublicIdFromUrl(ad.imageUrl);
        await cloudinary.uploader.destroy(publicId);
        console.log("Old image deleted from Cloudinary:", publicId);
      }

      // Upload new image
      const uploadResult = await cloudinary.uploader.upload(file.filepath, {
        folder: 'hauller_ads',
        public_id: `ad_${id}_${Date.now()}`
      });

      console.log("New image uploaded:", uploadResult.secure_url);

      // Update imageUrl in MongoDB
      await collection.updateOne(
        { '_id':mongodb.ObjectId(id)},
        {
          $set: {
            image: uploadResult.secure_url,
            adDateTime: new Date()
          }
        }
      );

      callback(null, uploadResult.secure_url); // success

    } catch (error) {
      console.error("Error updating image:", error);
      callback("Image update failed");
    }
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

function addContactClicksField() {
  const collection = db.collection("add");
  collection.updateMany(
    { contactClicks: { $exists: false } },
    { $set: { contactClicks: 0 } },
    function(err, result) {
      if (err) {
        console.log("Error adding contactClicks:", err);
      } else {
        console.log("Successfully updated documents:", result.modifiedCount);
      }
    }
  );
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
            addContactClicksField();
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
  const wishlistCollection = db.collection("wishlist");

  const userIdObject = { '_id': mongodb.ObjectId(id) };
  const notificationFilter = { 'userId': id };

  // Step 1: Fetch all ads (sorted by popularity & name)
  addCollection.find().sort({ contactClicks: -1, name: 1 }).toArray(function(err, ads) {
    if (err) {
      console.error("Error fetching ads:", err);
      return res.status(500).send("Error fetching ads");
    }

    // Step 2: Fetch member details
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

      // Step 3: Fetch wishlist ad IDs
      wishlistCollection.find({ memberId: id }).toArray(function(err, favs) {
        const favIds = favs.map(f => f.adId); // adId is a string

        // Step 4: Mark ads as wishlisted
        ads.forEach(ad => {
          ad.isWishlisted = favIds.includes(ad._id.toString());
        });

        // Step 5: Count notifications
        notificationCollection.countDocuments(notificationFilter, function(err, count) {
          if (err) {
            console.error("Error counting notifications:", err);
            count = 0;
          }

          // Step 6: Render page
          res.render("member-viewadds", {
            title: "View Page",
            data: ads,
            id: id,
            name: user.name,
            image: user.image,
            notificationCount: count
          });
        });
      });
    });
  });
    },

        addToWishlist: async function(memberId, adId) {
        const favoritesCollection = db.collection("member_favorites");
        const filter = { memberId, adId };

        // Avoid duplicates
        const exists = await favoritesCollection.findOne(filter);
        if (!exists) {
            await favoritesCollection.insertOne({
                memberId,
                adId: mongodb.ObjectId(adId),
                addedAt: new Date()
            });
        }
    },

    getWishlist: async function(memberId) {
        const favoritesCollection = db.collection("member_favorites");
        const adCollection = db.collection("add");

        const favoriteEntries = await favoritesCollection.find({ memberId }).toArray();
        const adIds = favoriteEntries.map(entry => mongodb.ObjectId(entry.adId));

        return adCollection.find({ _id: { $in: adIds } }).toArray();
    },

    removeFromWishlist: async function(memberId, adId) {
        const favoritesCollection = db.collection("member_favorites");
        await favoritesCollection.deleteOne({ memberId, adId });
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
                _id: n._id,
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
const notificationFilter = { 'userId': id };
collection.countDocuments(notificationFilter, function(err, count)  {
            if (err) {
                console.error("Error counting notifications:", err);
                count = 0;
             
            }var image
             var name
            res.render('member-viewnotifications', { data: formatted, id: id,notificationCount: count,image : image, name:name});})
   
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
     deletenot : function(id,res){
        var collection = db.collection("member_notifications")
        var filter = {
            "_id" : mongodb.ObjectId(id)
        }
        collection.deleteOne(filter,function(err,data){
            if(err){
                console.log("Err while deleting add")
            }
        })
        res.redirect("/member/notification")
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
     dnot : function(id,res){
        var collection = db.collection("member_notifications")
        var filter = {
            "userId" : id
        }
        collection.deleteMany(filter,function(err,data){
            if(err){
                console.log("Err while deleting notification")
            }
        })
        res.redirect("/member/notification")
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
    
    retrieveusers: function(id, res) {
    const collection = db.collection("member");

    collection.findOne({ _id: mongodb.ObjectId(id) }, function(err, currentUser) {
        if (err) {
            console.error("Error finding current user:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        collection.find({
            _id: { $ne: mongodb.ObjectId(id) } // Exclude current user
        }, {
            projection: { password: 0 }
        }).toArray(function(err, otherUsers) {
            if (err) {
                console.log("Error retrieving other users");
                return;
            }
            console.log("Current user:", currentUser);
          

   console.log("Other users:", otherUsers);
            res.render("chat", { currentUser, otherUsers });
        });
    });
}
,
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
        smemberadds : function(id,zname,res){
     
       // var vid = mongodb.ObjectId(id)
      var g= zname.toLocaleLowerCase()
      

console.log("g",g)
      const filter5 = {
  $or: [
    { name: { $regex: g, $options: 'i' } },
    { description: { $regex: g, $options: 'i' } }
  ]
};
      
       


 const addCollection = db.collection("add");
const notificationCollection = db.collection("member_notifications");
const memberCollection = db.collection("member");

const userIdObject = { '_id': mongodb.ObjectId(id) };
const notificationFilter = { 'userId': id };

// Step 1: Fetch all ads
addCollection.find(filter5).toArray(function(err, ads) {
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
   console.log("notification count:", count);
   console.log("ads search:", ads)
            // Step 4: Render page with all data
            return res.render("member-viewadds", {
                title: "View Page",
                data: ads,
                id: id,
                name: user.name,
                image: user.image,
                notificationCount: count
            });
        });
    });
});



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

function getDb() {
  return db;
}

    module.exports = {
        dbController,
        loginmember,
        insertAd,
        getbyid,
        insertimg,
        insertNotification,
        insertmem,
        getDb
    };
