/*
# Elassandra is a combination of cassandra and elastic search
# The setup of the elassandra via docker container is listed below.

1. sudo docker run -p 9200:9200 --name elassandra strapdata/elassandra:latest

# The Cqlsh shell will be accessible by sshing into the docker container
# On port 9042

2. After the cassandra is filled up with the data, we can access it like mentioned in the elassandra folder
*/

var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {  
  hosts: [
    'http://172.17.0.2:9200/'
  ]
});

module.exports = client;  