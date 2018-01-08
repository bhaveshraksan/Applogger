import client from '../common/cassandraConnection';


const query = 'SELECT * FROM logs.auditLogs where "moduleName" IN ? order by "timeStamp" desc Limit ? allow filtering;';
var moduleNames = ['PROCESSSETUP','ll','Helo'];
var limit = 10;
var sortBy = 'desc';

async function fetchAuditLogs() {

    var results = await client.execute(query,[moduleNames,limit], { prepare: true, fetchSize: 0 });
    return results;

}
module.exports = fetchAuditLogs