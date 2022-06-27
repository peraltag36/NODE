var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", async (req, res, next) => {
  var emailadress = req.body.emailadress;
  var comentario = req.body.comentario;

  console.log(req.body)

  var obj = {
    to: 'peraltag36@gmail.com',
    subject: 'CONTACTO WEB',
    html: emailadress + "se contacto a traves de la web y quiere mas informacion a su direccion de correo" + ".<br> Ademas hizo este comentario: " + comentario
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });



  var info = await transport.sendMail(obj);

  res.render('contacto', {
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
