
const { createLogger, format, transports ,  } = require('winston');
const { combine, timestamp, label, printf ,colorize} = format;

const defFormat = printf(({level,message,timestamp})=>{
return `${timestamp} [${level}] ${message}`
}) 

  const logger = createLogger({
        level: 'info',
        format: combine(colorize(), timestamp({format : "HH:mm:ss"}), defFormat),
        transports:[
             new transports.Console(),
             new transports.File({ filename: 'error.log', level: 'error' })
            
        ]
    })

module.exports = logger

