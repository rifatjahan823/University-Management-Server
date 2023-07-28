import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Database Connected ${config.port}`)
    })
  } catch (err) {
    console.log('Database not connected')
  }
}

main().catch(err => console.log(err))
