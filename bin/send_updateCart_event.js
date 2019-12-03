const client = require("../client");

client.select
  .workflow("AbandonedCart")
  .send("updateCart", {
    items: [
      { sku: 456, name: "item_1" },
      { sku: 789, name: "item_2" }
    ]
  });
