import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, infoLogger } from './shared/logger'


async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
     infoLogger.info(`Database Connected ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Database not connected')
  }
}

main().catch(err => errorLogger.error(err))
