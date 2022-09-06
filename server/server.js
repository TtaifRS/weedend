import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'


//initializing dotenv
dotenv.config({ path: './config/config.env' })
//express initializing
const app = express()

//routes 
import products from './routes/products.js'
import auth from './routes/auth.js'
import users from './routes/users.js'
import subscription from './routes/sub.js'

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


app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

//express bodyparser 
app.use(express.json())

//cookie perser 
app.use(cookieParser())


//route
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', users)
app.use('/api/v1', subscription)

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
