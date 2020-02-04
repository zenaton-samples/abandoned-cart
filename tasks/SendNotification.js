const { IncomingWebhook } = require('@slack/webhook');

module.exports.handle = async function (cart) {
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

  await webhook.send({
    text: `A user has an issue with cart ${cart.cart_id}`,
  });
};
