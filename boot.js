// load dependencies
const { workflow } = require('zenaton');

// load definitions
const workflowDefinition = require("./workflows/AbandonedCart");

workflow("AbandonedCart", workflowDefinition);
