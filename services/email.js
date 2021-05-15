const sendgrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  #sender = sendgrid
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'develompnent':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'linl for prouction'
        break

      default:
        this.link = 'http://localhost:3000'
        break
    }
  }

  #createTempleteVerifyEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus ',
      product: {
        // Appears in header & footer of e-mails
        name: 'System Phonebook',
        link: this.link,
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    })

    const email = {
      body: {
        name,
        intro: "Welcome to System Phonebook! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }

    const emailBody = mailGenerator.generator(email)
    return emailBodt
  }

  async sendVerifyEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email, // Change to your recipient
      from: 'spekav@i.ua', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTempleteVerifyEmail(verifyToken, name),
    }

    this.#sender.send(msg)
  }
}

module.exports = EmailService

/*
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
*/
