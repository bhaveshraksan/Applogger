import client from '../common/cassandraConnection';
const uuidv4 = require('uuid/v4')
function createKeyspace() {
    const query = "CREATE KEYSPACE IF NOT EXISTS logs WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' };"
    return client.execute(query);
}

function createTypes() {
    var query = `CREATE TYPE  IF NOT EXISTS logs.userAgentType ( 
                   ipAddress text, 
                   OS text,
                   browser text, 
                   deviceModel text, 
                   deviceType text, 
                   deviceVendor text
                );`
    return client.execute(query);
}

function createTableInCassandra() {
    var query = "CREATE TABLE IF NOT EXISTS logs.auditLogs" +
        "(id UUID,userId text,userName text,collectionName text,url text,docId text,action text,field text,previousValue text,currentValue text,timeStamp timestamp,userAgent frozen <userAgentType>,moduleName text, fieldName text,clusterId text,chapterId text,subChapterId text,communityId text,clusterName text,chapterName text,subChapterName text,communityCode text,errorReason text,PRIMARY KEY ((moduleName),id,timestamp, fieldName , previousValue, currentValue, userName,userAgent)) WITH CLUSTERING ORDER BY (  id  ASC,timestamp  ASC, fieldName ASC, previousValue ASC, currentValue ASC, userName ASC,userAgent ASC);"
    return client.execute(query);

}

function insertData(newObject) {
    newObject.id = uuidv4();
    var insertRepo = 'INSERT INTO logs.auditLogs (id,userId,userName,collectionName,url,docId,action,field,previousValue,currentValue,timeStamp,userAgent,moduleName,fieldName,clusterId,chapterId,subChapterId,communityId,clusterName,chapterName,subChapterName,communityCode,errorReason)'
        + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?);';

    return client.execute(insertRepo,
        [newObject.id,newObject.userId, newObject.userName, newObject.collectionName, newObject.url, newObject.docId, newObject.action, newObject.field, newObject.previousValue, newObject.currentValue, newObject.timeStamp,newObject.userAgent, newObject.moduleName, newObject.fieldName,newObject.clusterId,newObject.chapterId,newObject.subChapterId,newObject.communityId,newObject.clusterName,newObject.chapterName,newObject.subChapterName,newObject.communityCode,newObject.errorReason],
        {prepare: true});
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
            //return client.shutdown();
        });
}


module.exports = {createSchemaCassandra};

