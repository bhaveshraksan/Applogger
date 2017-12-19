var cassandra = require('cassandra-driver')

var client = new cassandra.Client({
    contactPoints: ['***.***.***.***:9042']
});

function createKeyspace() {
    const query = "CREATE KEYSPACE IF NOT EXISTS logs WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' };"
    return client.execute(query);
}

function createTypes() {
    var query = `CREATE TYPE  IF NOT EXISTS logs.newValueType ( 
                   userId text, 
                   taskName text
                );`
    return client.execute(query);
}
function createTableInCassandra() {
    var query ="CREATE TABLE IF NOT EXISTS logs.auditLogs" +
        "(id text,TimeStamp text,queryName text,taskName text,userId text PRIMARY KEY,newValue text,oldValue text,moduleName text,newValue2 frozen <newValueType>,audit text,);"
    return client.execute(query);

}


function createSchemaCassandra() {
    client.connect()
        .then(function () {
            return createKeyspace()
        })
        .then(function () {
            return createTypes()
        })
        .then(function () {
            return createTableInCassandra()
        })
        .then(function () {
            client.shutdown();
        })
        .catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown();
        });
}



createSchemaCassandra()