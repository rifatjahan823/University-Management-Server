/* eslint-disable no-undef */
import winston, { format} from 'winston'
import path from 'path'
const { combine, timestamp, label, printf, prettyPrint } = format
import  DailyRotateFile from 'winston-daily-rotate-file';



const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minutes}:${second}[${label}] ${level}: ${message}`
})

const infoLogger = winston.createLogger({
    level: 'info',
    format:combine(
      label({ label: 'right meow!' }),
      timestamp(),
      myFormat,
      prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename:path.join(process.cwd(),'logs','winston','successes','phu-%DATE%-success.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }),
    ],
  });


const errorLogger = winston.createLogger({
    level: 'error',
    format:combine(
      label({ label: 'right meow!' }),
      timestamp(),
      myFormat,
      prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        filename:path.join(process.cwd(),'logs','winston','erros','phu-%DATE%-error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }),
    ],
  });


export {
  infoLogger,
  errorLogger
}

