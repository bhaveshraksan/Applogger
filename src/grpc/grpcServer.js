var PROTO_PATH = __dirname + '/../../protos/getAudits.proto';
var grpc = require('grpc');
var audits_proto = grpc.load(PROTO_PATH).getAuditsLogsPkg;
import fetchAuditLogs from '../cassandra/fetchAuditLogs'

async function getAuditLogs(call, callback) {
    let request = call.request;
    console.log(request);
    let logs = await fetchAuditLogs();
    callback(null, {result: logs,resultCount:10});
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(audits_proto.AuditsLogs.service, {getAuditLogs: getAuditLogs});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();
