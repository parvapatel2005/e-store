const {Router} = require('express');
const { sendEmail } = require('../middleware/email.js');
const router = Router();

router.post('/', async (req, res) => {
  try{
    console.log(req.body);
    const { name, email, subject, message } = req.body;

    sendEmail(email, subject, `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    res.status(200).json({ message: "Contact form submitted successfully" });
  }catch(err){
    console.log("Error handling contact form submission: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
