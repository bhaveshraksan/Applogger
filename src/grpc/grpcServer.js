var PROTO_PATH = __dirname + '/../../protos/getAudits.proto';
var grpc = require('grpc');
var audits_proto = grpc.load(PROTO_PATH).getAuditsLogsPkg;

var Audit = require('../../src/model/audit.model');


async function getAuditLogs(call, callback) {
    let request = call.request;

    callback(null, {result: historyAuditLogs,resultCount:countAuditLogs});


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
