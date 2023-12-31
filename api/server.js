import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.route.js'
import usersRouter from './routes/users.route.js'
import clientsRouter from './routes/clients.route.js'
import productsRouter from './routes/products.route.js'
import categoriesRouter from './routes/categories.route.js'
import emailRouter from './routes/email.route.js'

import { corsOptions } from './config/corsOptions.js';
import { connectDB } from './config/connectDb.js';

/* calling function */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config()
connectDB()
const app = express()

/* middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/* routes */
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/clients', clientsRouter)
app.use('/products', productsRouter)
app.use('/categories', categoriesRouter)
app.use('/email', emailRouter)

/* connection */
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Problème interne au server'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

