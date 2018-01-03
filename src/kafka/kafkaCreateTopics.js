var kafka = require('kafka-node')
var Producer = kafka.Producer
var host = process.env.KAFKA_HOST || '127.0.0.1';
var port = process.env.KAFKA_PORT || '2181';
var client = new kafka.Client(host + ':' + port) // Can give IP here if want to connect to different server as "localhost:2181"
var producer = new Producer(client);
import topics from './commons/kafkaTopics'

// Creating topics in Kafka Queue
function createTopicsKafka(){
    try {
        producer.on("ready", function () {
            producer.on('error', function (err) {
                console.log(err);
            });

            // Topic names in Array
            producer.createTopics(topics, true, function (err, data) {
                console.log('Topics created: '+ data);
                producer.close()
            });
        });
    }
    catch (err) {
        console.log('the error is occurred: ', err);
    }
}


createTopicsKafka()