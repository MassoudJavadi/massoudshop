//640 backend untill now
//get: fetch, post: add data, put:update
import path from 'path'
import express from 'express'
import dotenv from 'dotenv' 
import colors from 'colors'
import connectDB  from './config/db.js'
import morgan from 'morgan'



//Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//middleware
import {notFound,errorHandler} from './middleware/errorMiddleware.js'


dotenv.config()
//env file for token secrets, keys 

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }


app.use(express.json()) //accept json in body(for user auth)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

//Making uploads folder static for accessing in the browser.
const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
  app.get('/' , (req ,res)=>{res.send('API Is running')})
}



//Error Middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))



 