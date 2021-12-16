const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "fint8-dr@outlook.com",
      pass: "hacktiv8fint8"
    }
  });

  const option = {
    from: "fint8-dr@outlook.com",
    to: "ridwan@ridwanmail.com",
    subject: "test gunain nodejs",
    text: "berhasi berhasil hore!"
  }

  transporter.sendMail(option, function(err, info){
    if(err) {
      console.log(err);
      return
    }
    console.log("terkirim : "+info.response);
   
  })