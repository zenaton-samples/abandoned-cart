const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.handle = async function (cart) {
  await sendgrid.send({
    personalizations: [{ to: [{ email: cart.email }] }],
    content: [{
      type: "text/plain",
      value: "Hey, we've noticed you did not complete your purchase\n"
    }],
    subject: "You have a cart still open!",
    from: { email: "zenaton-tutorial@zenaton.com" }
  });
};
