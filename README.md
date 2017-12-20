Prerequisites:
Download Kafka:
```http://redrockdigimark.com/apachemirror/kafka/1.0.0/kafka_2.11-1.0.0.tgz```
Extract Kafka Binary Gzipped file
Start ZooKeeper :
```bin/zookeeper-server-start.sh config/zookeeper.properties```
Start Kafka :
```bin/kafka-server-start.sh config/server.properties ```

Give permissions to start.sh file in src directory
create kafka topics and consume logs by running : ```./start.sh``` in src directory.


