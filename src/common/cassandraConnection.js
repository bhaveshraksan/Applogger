var cassandra = require('cassandra-driver')
var client = new cassandra.Client({
    // contactPoints: ['10.0.2.16:9042'] // Insert the dev IP here
    contactPoints: ['127.0.0.1:9042'] // Insert the dev IP here
});

module.exports = client
