const mongodb = require('mongodb')
const mongoClient = require('mongodb').MongoClient
var url = process.env.MONGO_URI
var db;

function loginadmin(email,password){

    var collection =db.collection("admin")
    var filter={
        "email":email,
        "password":password
    }
    var userData=collection.findOne(filter)
    return userData;
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
            db = database.db("faster")
            console.log("DB Connected from admin")
        })
    },
    
    viewmemberadds : function(id,res){
        var collection = db.collection("add")
       // var vid = mongodb.ObjectId(id)
       var filter ={
                  "id":id
       }
      
        collection.find(filter).toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("admin-viewadds", {title: "view tasks", addData : result})
        })
    },
    viewmembers : function(res){
        var collection = db.collection("member")
        collection.find().toArray(function(err,result){
            if(err){
                console.log("Err in view")
                return
            }
            res.render("admin-viewmember", {title: "view page", data : result})
        })
    },
    request : function(id,res){
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
            res.render("admin-request", {title: "view page", mdata:memdata})
            })
            console.log("result",result)
            
        })
    },

}

    module.exports = {dbController,loginadmin,getbyid}