const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")

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