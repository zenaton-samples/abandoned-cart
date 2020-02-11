// load .env
require('dotenv').config();

// load dependencies
const { task, workflow } = require('zenaton');

// define tasks
task("SendReminder", require("./tasks/SendReminder"));
task("SendDiscount", require("./tasks/SendDiscount"));

// define workflows
workflow("AbandonedCart", require("./workflows/AbandonedCart"));
