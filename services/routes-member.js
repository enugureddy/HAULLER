const controller = require("./controller-member")
const express = require('express');
const router = express.Router();
const { isAdminLoggedIn } = require('../middleware/auth');
module.exports=function(member){
   
    member.route("/").get(controller.login)
    member.route("/loginverify").post(controller.loginverify)
    member.route("/member-register").get(controller.register)
    member.route("/registerpost").post(controller.registerpost)
    member.route('/member-forgotpassword').get(controller.forgotpassword)
    member.route('/sendpassword').post(controller.sendpassword)
    member.route("/contactclick/:id").post(controller.incrementContactClicks)
    member.route("/favourites").get(isAdminLoggedIn, controller.viewFavourites);
    member.route("/favourites/add/:adId").get(isAdminLoggedIn, controller.addToWishlist);
    member.route("/favourites/remove/:adId").get(isAdminLoggedIn, controller.removeFromWishlist);

    member.route("/viewadds").get(isAdminLoggedIn,controller.viewadds) 
    member.route("/notification").get(isAdminLoggedIn,controller.notification)
      member.route("/addnotification").post(isAdminLoggedIn,controller.addnotification)
      
//        router.post('/addnotification',async (req, res) => {
//   controller.addnotification(req,res)
    
member.get('/api/student', (req, res) => {
  res.json({
    name: "Enugu Thirumal Reddy",
    studentId: "s224849242"
  });
});
member.route("/chat").get(isAdminLoggedIn,controller.chat)

   // member.route('/uploadview').get(controller.uploadview)
   // member.route('/uploadaction').post(controller.uploadaction)
   member.route("/uploadview").get(isAdminLoggedIn,controller.uploadView)

   //do the action from the form
   member.route("/uploadaction").post(isAdminLoggedIn,controller.uploadAction)

   member.route("/delete/:id").get(isAdminLoggedIn,controller.delete)
member.route("/deletenot/:id").get(isAdminLoggedIn,controller.deletenot)

   member.route("/updatedet/:id").get(isAdminLoggedIn,controller.updatedet)

   member.route("/updateimg/:id").get(isAdminLoggedIn,controller.updateimg)

   member.route("/updateimgpost").post(isAdminLoggedIn,controller.updateimgpost)

   member.route("/updatedetpost").post(isAdminLoggedIn,controller.updatedetpost)
   
   member.route("/dadd").get(isAdminLoggedIn,controller.dadd)
   member.route("/dnot").get(isAdminLoggedIn,controller.dnot)
   member.route("/dacc").get(isAdminLoggedIn,controller.dacc)
   member.route("/uacc").get(isAdminLoggedIn,controller.uacc)
   member.route("/uacc").post(isAdminLoggedIn,controller.uaccpost)
   member.route("/view/:id").get(isAdminLoggedIn,controller.view)
   member.route('/search').get(controller.search)
    member.route('/logout').get(controller.logout)

}
