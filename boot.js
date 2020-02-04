// load dependencies
const { task, workflow } = require('zenaton');

// define tasks
task("SendNotification", require("./tasks/SendNotification"));
task("SendReminder", require("./tasks/SendReminder"));
task("SendDiscount", require("./tasks/SendDiscount"));

// define workflows
workflow("AbandonedCart", require("./workflows/AbandonedCart"));
