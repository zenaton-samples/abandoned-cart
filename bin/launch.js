const { run } = require("../client");

const params = {
  email: "foo@example.com",
  cart_id: 123,
  items: [
    { sku: 456, name: "item_1" }
  ]
};

run.workflow("AbandonedCart", params);
