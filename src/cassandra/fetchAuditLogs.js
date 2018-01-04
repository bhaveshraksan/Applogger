import client from '../common/cassandraConnection';


const query = 'SELECT * FROM logs.auditLogs where moduleName IN ? Limit ? allow filtering;';
var moduleNames = ['PROCESSSETUP','ll','Helo'];
var limit = 10;
var sort =

client.execute(query,[moduleNames,limit], { prepare: true })
    .then(result => console.log('User with email %s', JSON.stringify(result)));