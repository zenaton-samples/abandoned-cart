const client = require("../client");

client.select
  .workflow("AbandonedCart")
  .send("checkout");
