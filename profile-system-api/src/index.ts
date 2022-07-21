import express from 'express'
import 'dotenv/config'
import router from './routers'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

const PORT = 5080
const ENV = process.env.NODE_ENV

app.use(express.json({ limit: '6mb' }))
app.use(express.urlencoded({ extended: true, limit: '6mb' }))
app.use(cors())
app.use(helmet())

app.use('/api', router)

app.use((_, res) => res.send('this is the global page'))

app.listen(PORT, () => {
    console.log(`ENVIRONMENT: ${ENV}`)
    console.log(`This server is running on: 127.0.0.1:${PORT}`)
})
