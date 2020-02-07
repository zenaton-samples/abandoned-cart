const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.handle = async function (cart) {
  await sendgrid.send({
    personalizations: [{ to: [{ email: cart.email }] }],
    content: [{
        type: "text/plain",
        value: "Hey, we applied a small discount on your cart. Don't forget to complete your order before it expires!\n"
    }],
    subject: "Discount on your cart!",
    from: { email: "zenaton-tutorial@zenaton.com" }
  });
};
