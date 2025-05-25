const sgMail = require('@sendgrid/mail')
const url = process.env.SENDGRID_API_KEY
sgMail.setApiKey(url);

var sendMail = {
    send : function(toEmail, fromEmail, subject, html){
        //data verification
        //mandatory data
        if( toEmail == null )
        {
            return null;
        }

        const msg = {
            to: toEmail,
            from: fromEmail,
            subject: subject,
            html: html
          }
console.log(toEmail,fromEmail)
          sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
            })
            .catch((error) => {
            console.error(error)
            })
    }
}

module.exports = sendMail