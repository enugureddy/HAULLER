const controller = require("./controller-guest")

module.exports=function(guest){
    guest.route("/").get(controller.enter)
    guest.route("/enter").post(controller.login)
    guest.route("/view/:id").get(controller.view)
    guest.route("/contact/:id").get(controller.contact)
    guest.route("/contactpost").post(controller.contactpost)
    guest.route('/logout').get(controller.logout)
}