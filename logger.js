const express = require('express');
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
		    format.splat(),
		    format.simple()
		),
    transports: [new transports.Console()]
  }));
}
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
logger.log('info', 'test message %s', "asasas");
logger.info('test message %s', 'sjhdbgaj');
logger.error('The error happens for this phase only')
app.listen(3000, () => console.log('Example app listening on port 3000!'))