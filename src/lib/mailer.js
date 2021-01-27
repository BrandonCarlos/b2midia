const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "519af2e20de3e0",
      pass: "f26c672018dee6"
    }
  });

