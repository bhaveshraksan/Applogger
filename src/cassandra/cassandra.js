var cassandra = require('cassandra-driver')

var client = new cassandra.Client({
    contactPoints: ['13.59.46.187:9042'] // Insert the dev IP here
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


function createSchemaCassandra(newObject) {
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
            client.shutdown();
        })
        .catch(function (err) {
            console.error('There was an error', err);
            return client.shutdown();
        });
}



exports.createSchemaCassandra = createSchemaCassandra; 
// var obj = {"userId":"nrT5d5B8ct8pLyZSi",
// "userName":"platformadmin@moolya.global",
// "collectionName":"MlSubChapters",
// "url":"http://localhost:3000/admin/chapters/hwzPbwq5saa6LuhHD/DT9Y8iQEKuGa3f7R6/QvpiBt9HCGoqFGri5/Moolya-Ahmedabad/subChapterDetails",
// "docId":"QvpiBt9HCGoqFGri5",
// "action":"E",
// "field":"subChapterDisplayName",
// "previousValue":"\"Moolyad\"",
// "currentValue":"\"Moolyaddd\"",

// "userAgent":{"OS":"-","ipAddress":"127.0.0.1","browser":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36","deviceModel":"-","deviceType":"-","deviceVendor":"-"},

// "timeStamp":"2017-12-20T10:56:00.247Z","clusterId":"all","chapterId":"all","subChapterId":"all","communityId":"all","communityCode":"all","clusterName":"all","chapterName":"all","subChapterName":"all","moduleName":"SUBCHAPTER","fieldName":"subChapterDisplayName"};
// createSchemaCassandra(obj);