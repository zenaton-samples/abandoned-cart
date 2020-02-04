const { duration, task } = require("zenaton");

const duration1 = duration.minutes(20);
const duration2 = duration.days(1);
const duration3 = duration.days(3);

module.exports = {
  // the 'handle' generator function is the main function for the workflow execution and describes what needs to be done
  // in this workflow.
  *handle(cart) {
    // we store the cart as a property of the workflow. this will be useful to make the 'onEvent' function update the cart
    // and have changes reflected in the 'handle' function.
    this.cart = cart;

    // first, we wait for the 'checkout' event, up to 'duration1' seconds.
    let event = yield this.wait.event("checkout").for(duration1);

    // if the 'checkout' event was received it means the customer completed their order, we can stop the workflow.
    if (event !== null) return;

    /*
      Escalation phase 1 : in-app notification
    */

    // if the 'checkout' event was not received at this point, we send a notification in the company Slack so someone
    // from the support team can take a look to check if everything is fine, and even try to contact the customer.
    yield this.run.task("SendNotification", this.cart);

    // we wait again for the 'checkout' event, up to 'duration2' seconds.
    event = yield this.wait.event("checkout").for(duration2);

    // if the 'checkout' event was received it means the customer completed their order, we can stop the workflow.
    if (event !== null) return;

    /*
      Escalation phase 2 : e-mail reminder
    */

    // if the 'checkout' event is still not received, we will try to send an email reminder to them so they can
    // complete their order before the cart expires.
    yield this.run.task("SendReminder", this.cart);

    // we wait again for the 'checkout' event to occur, for up to 'duration3' seconds.
    event = yield this.wait.event("checkout").for(duration3);

    // if the 'checkout' event was received it means the customer completed their order, we can stop the workflow.
    if (event !== null) return;

    /*
      Escalation phase 3 : discount code by email
    */

    // the order has not been completed yet. we send a discount code by email to add some incentive.
    yield this.run.task("SendDiscount", this.cart);

    // end of the workflow.
  },
  // the 'onEvent' function is executed everytime the workflow is receiving an event.
  *onEvent(name, data) {
    // when the event name is 'updateCart', we update the cart stored as a workflow property.
    // this allows you to change the workflow depending on the content of the cart if you want to.
    if (name === "updateCart") {
      this.cart = { ...this.cart, items: data.items };
    }
  }
};
