import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'
import {Server}from 'http'

async function main() {
  let server:Server
  try {
    await mongoose.connect(config.database_url as string)
   server= app.listen(config.port, () => {
      infoLogger.info(`Database Connected ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Database not connected')
  }
  process.on('unhandledRejection',(error)=>{
    console.log('unhandledRejection')
    if(server){
      server.close(()=>{
        errorLogger.error(error)
        process.exit(1)
      })
    }else{
      process.exit(1)
    }
  })
}

main().catch(err => errorLogger.error(err))
