import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
// import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'

//initializing dotenv
dotenv.config({ path: './config/config.env' })
//express initializing
const app = express()

//routes 
import products from './routes/products.js'
import auth from './routes/auth.js'
import users from './routes/users.js'
import subscription from './routes/sub.js'
import field from './routes/field.js'
import producer from './routes/producer.js'

//other imports 
import connectDatabase from './config/database.js'
import errorMiddleware from './middlewares/errors.js'
import ErrorHandler from './utils/errorHandler.js'


//Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down due to uncaught exception.`)
  process.exit(1)
})




//database connection 
connectDatabase()

//{ origin: 'http://localhost:3000', credentials: true }
app.use(cors())

//http header security 
app.use(helmet())

//express bodyparser 
app.use(express.json())

//cookie perser 
app.use(cookieParser())

//santize data 
// app.use(mongoSanitize())

//prevent xss attcks 
app.use(xss())

//rare limit 
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 10 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)




//route
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', users)
app.use('/api/v1', subscription)
app.use('/api/v1', field)
app.use('/api/v1', producer)
//development 
app.get('/stripe/success', (req, res) => {
  res.send("Subscription successsful")
})

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found!`, 404))
})

app.use(errorMiddleware)


const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})


//handling unhandle promise rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to unhandle promise rejection.`)

  server.close(() => {
    process.exit(1)
  })
})
