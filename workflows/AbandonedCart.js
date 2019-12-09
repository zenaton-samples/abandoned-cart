const slackChannelId = "random";
const slackConnectorId = "";
const sendgridConnectorId = "";
const emailFrom = "zenaton-tutorial@zenaton.com";
const duration1 = 5;
const duration2 = 10;
const duration3 = 20;
// const duration1 = 20 * 60;       // 20 minutes
// const duration2 = 24 * 3600;     // 1 day
// const duration2 = 3 * 24 * 3600; // 3 days

module.exports = {
  *handle(cart) {
    // holds the last version of the cart
    this.cart = cart;

    // waits for the 'checkout' event, up to duration1 seconds
    let event = yield this.wait.event("checkout").for(duration1);

    // if 'checkout' event was received, then exit
    if (event !== null) return;

    /*
      Escalation phase 1 : in-app notification
    */

    // Send an in-app notification
    yield* this.sendNotification(this.cart);

    // waits again for the 'checkout' event, up to duration2 seconds
    event = yield this.wait.event("checkout").for(duration2);

    // if 'checkout' event was received, then exit
    if (event !== null) return;

    /*
      Escalation phase 2 : e-mail reminder
    */

    // send email reminder
    yield* this.sendReminder(this.cart);

    // waits again for the 'checkout' event to occur, for up to duration3 seconds
    event = yield this.wait.event("checkout").for(duration3);

    // if 'checkout' event was received, then exit
    if (event !== null) return;

    /*
      Escalation phase 3 : discount code by email
    */

    // Send a discount code by mail
    yield* this.sendDiscount(this.cart);

    // Exiting
  },
  *onEvent(name, data) {
    if (name === "updateCart") {
      this.cart = { ...this.cart, items: data.items };
    }
  },
  *sendNotification(cart) {
    /*
    const slack = this.connector("slack", slackConnectorId);

    slack.post("chat.postMessage", {
      body: {
        text: `A user has an issue with cart ${cart.cart_id}`,
        as_user: false,
        channel: slackChannelId
      }
    });
    */
  },
  *sendReminder(cart) {
    /*
    const sendgrid = this.connector("sendgrid", sendgridConnectorId);

    const payload = {
      body: {
        personalizations: [{ to: [{ email: cart.email }] }],
        content: [{
            type: "text/plain",
            value: "Hey, we've noticed you did not complete your purchase\n"
        }],
        subject: "You have a cart still open!",
        from: { email: emailFrom }
      }
    };

    sendgrid.post("/mail/send", payload);
    */
  },
  *sendDiscount(cart) {
    /*
    const sendgrid = this.connector("sendgrid", sendgridConnectorId);
    const payload = {
      body: {
        personalizations: [{ to: [{ email: cart.email }] }],
        content: [{
            type: "text/plain",
            value: "Hey, we've noticed you did not complete your purchase\n"
        }],
        subject: "Discount on your cart!",
        from: { email: emailFrom }
      }
    };

    sendgrid.post("/mail/send", payload);
    */
  }
};
