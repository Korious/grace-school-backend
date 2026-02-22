import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

import connectDB from './configs/db.js'
import userRoutes from './routes/user.route.js'
import errorHanding from './middlewares/errorHandler.js'
import eventRoute from './routes/events.route.js'
import categoryRoute from './routes/category.route.js'
import folderRoute from './routes/folder.route.js'
import galleryRoute from './routes/gallery.route.js'
import contactRoute from './routes/contact.route.js'

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {credentiials: true, origin: process.env.URL || '*'}

// Connect to MongoDB
connectDB();

// Configure static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Middlewares
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/', express.static(join(__dirname, 'public')))

// Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/event', eventRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/folder', folderRoute)
app.use('/api/v1/gallery', galleryRoute)
app.use('/api/v1/contact', contactRoute)

// Error handling middleware
app.use(errorHanding)

// Testing MongoDB Connection
app.get('/', async(req, res) => {
    res.send(`Connected to MongoDB database: graceschool`)
})

// Server running
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})