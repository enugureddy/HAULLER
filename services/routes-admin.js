const controller = require("./controller-admin")

module.exports=function(admin){
    admin.route("/").get(controller.login)
    admin.route("/loginverify").post(controller.loginverify)
    admin.route("/viewmembers").get(controller.viewmembers)
    
  //  admin.route("/viewadds").get(controller.viewadds) 
    admin.route('/viewmemberadds/:id').get(controller.viewmemberadds)
    admin.route("/view/:id").get(controller.view)
  //  admin.route("/request/:id").get(controller.request)
  admin.route("/request/:id").get(controller.request)
  admin.route("/requestpost").post(controller.requestpost)
  admin.route('/back').get(controller.back)
    admin.route('/logout').get(controller.logout)
   // admin.route("/admin-register").get(controller.register)
}