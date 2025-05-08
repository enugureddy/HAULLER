const controller = require("./controller-member")

module.exports=function(member){
    member.route("/").get(controller.login)
    member.route("/loginverify").post(controller.loginverify)
    member.route("/member-register").get(controller.register)
    member.route("/registerpost").post(controller.registerpost)
    member.route('/member-forgotpassword').get(controller.forgotpassword)
    member.route('/sendpassword').post(controller.sendpassword)
    member.route("/viewadds").get(controller.viewadds) 
   // member.route('/uploadview').get(controller.uploadview)
   // member.route('/uploadaction').post(controller.uploadaction)
   member.route("/uploadview").get(controller.uploadView)

   //do the action from the form
   member.route("/uploadaction").post(controller.uploadAction)

   member.route("/delete/:id").get(controller.delete)


   member.route("/updatedet/:id").get(controller.updatedet)

   member.route("/updateimg/:id").get(controller.updateimg)

   member.route("/updateimgpost").post(controller.updateimgpost)

   member.route("/updatedetpost").post(controller.updatedetpost)
   
   member.route("/dadd").get(controller.dadd)
   member.route("/dacc").get(controller.dacc)
   member.route("/uacc").get(controller.uacc)
   member.route("/uacc").post(controller.uaccpost)
   member.route("/view/:id").get(controller.view)
  
    member.route('/logout').get(controller.logout)

}