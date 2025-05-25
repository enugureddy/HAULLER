const controller = require("./controller-guest")

module.exports=function(guest){
    guest.route("/").get(controller.enter)
    guest.route("/enter").post(controller.login)
    guest.route("/viewmemberadds").get(controller.viewmemberadds);
    guest.route("/view/:id").get(controller.view)
    guest.route("/contactclick/:id").post(controller.incrementContactClicks)
    guest.route("/contact/:id").get(controller.contact)
    guest.route("/contactpost").post(controller.contactpost)
    guest.route('/logout').get(controller.logout)
}