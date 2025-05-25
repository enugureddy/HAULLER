const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
var url = process.env.MONGO_URI
var db;



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
                console.log("Err in database server connection")
                return
            }
            db = database.db("hauller")
            console.log("DB Connected from Guest")
            
            addContactClicksField();
        })
    },
    viewmemberadds : function(res){
        var collection = db.collection("add")
       // var vid = mongodb.ObjectId(id)
      
        collection.find().sort({ contactClicks: -1, name: 1 }).toArray(function(err, ads) {

            if(err){
                console.log("Err in view")
                return
            }
            res.render("guest-viewadds", {title: "view tasks", addData : ads})
        })
    },
   /*  contact : function(id,res){
        var collection = db.collection("member")
        var filter={
            "_id":mongodb.ObjectId(id)
        }
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("guest-contact", {title: "view page", data : result})
        })
    }, */
    contact : function(id,res){
        var collection = db.collection("add")
        var filter={
            "_id":mongodb.ObjectId(id)
        }
       var adddata=null
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            result.forEach(element=>{
                adddata=element

            })
            var memid=adddata.id
            console.log(memid)

            var memcoll=db.collection("member")
            var filter2={
            "_id":mongodb.ObjectId(memid)

            }
            console.log(filter2)
          //  var memdata
            memcoll.find(filter2).toArray(function(err,output){
                if(err){
                    console.log("Err in view")
                    return
                }
              output.forEach(element=>{
                    memdata=element
    
               })
             console.log("output",output)
             console.log("memdata",memdata)
            res.render("guest-contact", {title: "view page", mdata:memdata})
            })
            console.log("result",result)
            
        })
    },


}

    module.exports = {dbController,getbyid}