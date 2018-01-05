var PROTO_PATH = __dirname + '/../../protos/getAudits.proto';
console.log(PROTO_PATH);
var grpc = require('grpc');
var audits_proto = grpc.load(PROTO_PATH).getAuditsLogsPkg;

async function main() {
    var client = new audits_proto.AuditsLogs('localhost:50051',
        grpc.credentials.createInsecure());
    var requestObj = {
        skip:1,
        limit:10
    }
    client.getAuditLogs(requestObj,function (err,res) {
        console.log(res);
    });
}

main();
