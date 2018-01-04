var PROTO_PATH = __dirname + '/../../protos/getAudits.proto';

var grpc = require('grpc');
var audits_proto = grpc.load(PROTO_PATH).getAuditsLogsPkg;

function main() {
    var client = new audits_proto.AuditsLogs('localhost:50051',
        grpc.credentials.createInsecure());
    var requestObj = {
        offset:1,
        limit:10,
        orderBy:'TimeStamp'
    }
    client.getAuditLogs(requestObj,function (err, response) {
        console.log('Greeting:', response);
    });
    console.log('Greeting:');
}

main();
