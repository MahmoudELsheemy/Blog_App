const nodeEmailer = require("nodemailer");

module.exports = async (email, subject, html) => {
  try {
    const transporter = nodeEmailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL_APP,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Error sending email");
  }
};
