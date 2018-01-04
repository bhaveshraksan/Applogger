#!/usr/bin/env bash
babel-node kafka/kafkaCreateTopics &
babel-node kafka/kafkaConsumer
babel-node src/grpc/grpcServer.js --presets es2015,stage-2