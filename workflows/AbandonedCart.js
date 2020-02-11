const { duration } = require("zenaton");

const duration_before_email = duration.minutes(20);
const duration_before_discount = duration.days(3);

module.exports = {
  // the 'handle' generator function is the main function for the workflow execution and describes what needs to be done
  // in this workflow.
  *handle(cart) {
    // we store the cart as a property of the workflow. this will be useful to make the 'onEvent' function update the cart
    // and have changes reflected in the 'handle' function.
    this.cart = cart;

    // wait for 'duration_before_email' seconds.
    yield this.wait.for(duration_before_email);

    // send an email reminder to them so they can complete their order before the cart expires.
    yield this.run.task("SendReminder", this.cart);

    // wait for 'duration_before_discount' seconds.
    yield this.wait.for(duration_before_discount);

    // send a discount code by email to add some incentive.
    yield this.run.task("SendDiscount", this.cart);

    // end of the workflow.
  },
  // the 'onEvent' function is executed everytime the workflow is receiving an event.
  *onEvent(name, data) {
    // when the event name is 'cartUpdated', we update the cart stored as a workflow property.
    // this allows you to change the workflow depending on the content of the cart if you want to.
    if (name === "cartUpdated") {
      this.cart = { ...this.cart, items: data.items };
    }
    // when the event name is 'checkout', we immediately terminate the workflow.
    if (name === "checkout") {
      // note: we could add notifications or some other tasks before terminating
      this.terminate();
    }
  }
};
