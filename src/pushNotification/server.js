// Created by shubhankit saxena
// This is the server file, which will be used to send the notification message to 
// the instance Id received from the client side code
var gcm = require("node-gcm");
var async = require("async");
let sender = new gcm.Sender("AAAAuB2v3xE:APA91bGFwduN9JGASvjzvM9UDD_IHA7b-Gbvkepy8K30W5VPg4p1t9O6jj1XKGUhOizaisud_Nk3kPfn_xBSkxhSgIysL9RVZRZyUpLxaco1YDu3h55w2Vu_3e72VnJnaxwyv-I0-bYW");
let message = new gcm.Message({
    notification: {
        title: "RAKSAN NOTIFICATIONS ! ",
        icon: "logo.png",
        body: "Sample Notification From Raksan"
    },
});
// let recipients= gcm.IRecipient = { to: "/topics/all" };
// sender.sendNoRetry(message, ["dw3g6_MkRoo:APA91bEjwGbCb-7nCPghwWcWIJQ4pxm1GwHdjLTABPhJBd8C8hMzy1r2O3kK53oQ47GVAEtnf40R5A85e8Y31MO8S9vuJHIXbjdnH2khjR1JmWzHGd3G9NAZvyFRdKXRQ_lt7z5z3t9o"], (err, response) => {
//     if (err) console.error(err);
//     else console.log(response);
// });

// Sample tokens
var myToken = "eq-iT0j7Cjw:APA91bGjCQhG3q8c-QG-a1TOG-W_AofTXiqC_BZBnc9hPY5xhymO3zBA7y5LpEy02h2LrKq6hbOEj9-rTxYg9uRegMrIe7Xg0ZdmPv3o_6D73J6zvAeBIoMLGvEHS_0I9_HhkcIiVr0_";
var mt2 = "dMQGd-4wlxE:APA91bGROpyhVm1xt6akCw90-nxCW2yKJ6R4qXyqCdAuiMhaXdismsI6CaMUHCFqHzsrhP-8gePp5n72uuC4XbEgazCEmy7t6kYkOruVg08HBYIKZ9k81axnQyqUSBIebSjhYSeHrthZ";

var tokens = [];
tokens.push(myToken);
tokens.push(mt2);
//Since max limit is 1000
var batchLimit = 1000;
var tokenBatches = [];
for (var start = 0; start < tokens.length; start += batchLimit) {
    var slicedTokens = tokens.slice(start, start + batchLimit);
    tokenBatches.push(slicedTokens);
}

async.each(tokenBatches, function (batch, callback) {
    sender.send(message, { registrationIds: batch }, function (err, result) {
        if (err) {
            // Stop executing other batches
            return callback(err);
        }
        callback();
    });
},
function (err) {
    if (err) {
        console.log(err);
    }
});