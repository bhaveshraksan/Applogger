var cassandra = require('cassandra-driver')

var client = new cassandra.Client({
    // contactPoints: ['10.0.2.16:9042'] // Insert the dev IP here
    contactPoints: ['127.0.0.1:9042'] // Insert the dev IP here
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
        "(userId text,userName text,collectionName text,url text,docId text PRIMARY KEY,action text,field text,previousValue text,currentValue text,timeStamp text);"
    return client.execute(query);

}

function insertData(newObject){
    var insertRepo = 'INSERT INTO logs.auditLogs (userId,userName,collectionName,url,docId,action,field,previousValue,currentValue,timeStamp) '
    + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

    return client.execute(insertRepo,
                   [newObject.userId,newObject.userName,newObject.collectionName,newObject.url,newObject.docId,newObject.action,newObject.field,newObject.previousValue,newObject.currentValue,newObject.timeStamp],
                   { prepare : true });
}


export function createSchemaCassandra(newObject) {
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
            return insertData(newObject)
        })
        .then(function () {
            // client.shutdown();
        })
        .catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown();
        });
}



module.exports= {createSchemaCassandra};