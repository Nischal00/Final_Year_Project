const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

exports.postSendInvite = (req, res, next) => {
  const email = req.body.emailId;
  const room = req.body.roomId;
  const name = req.body.username;
  console.log(email);
  const msg = {
    to: email,
    from: "codeQuantaicp@gmail.com",
    subject: "Invitation from CodeQuanta",
    html: `<div class="box-outer"><h2><span>${name}<span> is inviting you in CodeQuanta</h2><p>Click below link to join room.</p><a href="http://localhost:8080//${room}">Join Room</a><h3>Happy Coding!</h3></div>
      `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("sent");
      res.send("Success");
    })
    .catch((error) => {
      res.send(error);
    });
};
