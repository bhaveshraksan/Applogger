var kafka = require('kafka-node')
import topics from './commons/kafkaTopics'
var Consumer = kafka.Consumer;
import {createSchemaCassandra } from '../cassandra/cassandra';
var host = process.env.KAFKA_HOST || '127.0.0.1';
var port = process.env.KAFKA_PORT || '2181';
var client = new kafka.Client(host + ':' + port) // Can give IP here if want to connect to different server as "localhost:2181"

// Consuming access logs
function consumingKafkaQueue() {
    "use strict";


    var topicsKafka = []
    for (let topic of topics) {
        topicsKafka.push({topic: topic, partition: 0})
    }
    var consumer = new Consumer(
        client,
        topicsKafka,
        {
            autoCommit: false
        }
    );

// Receiving messages on basis of  Topics
    consumer.on('message', function (message) {
        // console.log(message)
        console.log(message.value)
        if (message.topic === 'auditLogs' &&  message.value.length > 20) {
            try {
                createSchemaCassandra(JSON.parse(message.value));
                console.log('The message going to send to store in DB is :', JSON.stringify(message.value));
                //insertIntoTableCassandra(message)  // Insertion into cassandra
            }catch (e){
                console.log('Consumer Receiving Error: ',err);
            }
        }
    });

    consumer.on('error', function (err) {
        console.log('consumingKafkaMessages:', err)
    })
}
consumingKafkaQueue()