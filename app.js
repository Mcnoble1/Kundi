const express = require("express")
const cors = require("cors")
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const adminRouter = require('./routes/admin.routes/auth.route')
const workerRouter = require('./routes/admin.routes/worker.route')
const categoryRouter = require('./routes/admin.routes/category.route')
const serviceRouter = require('./routes/admin.routes/service.route')
const transportationRouter = require('./routes/admin.routes/transportation.route')
const feedbackRouter = require('./routes/admin.routes/feedback.route')
const customerRouter = require("./routes/admin.routes/customer.route")

const userRoute = require('./routes/user.routes/auth.route')
const feedbackRoute = require('./routes/user.routes/feedback.route')
const workerRoute = require('./routes/user.routes/worker.route')    
const categoryRoute = require('./routes/user.routes/category.route')
const transportationRoute = require('./routes/user.routes/transportation.route')

const logger = require('./logger/logger')
require('./db.js').connectToMongoDB()
require("./authentication/auth.js")
require("dotenv").config()

const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false, 
}) 
app.use(limiter)
app.use(helmet());
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to Home Page"})
    logger.info("Welcome to Home Page")
    

})


app.use('/api/admin', adminRouter)
app.use('/api/admin/worker', workerRouter)
app.use('/api/admin/category', categoryRouter)
app.use('/api/admin/service', serviceRouter)
app.use('/api/admin/transportation', transportationRouter)
app.use('/api/admin/feedback', feedbackRouter)
app.use('/api/admin/customer', customerRouter)


app.use('/api/user', userRoute)
app.use('/api/user/feedback', feedbackRoute)
app.use('/api/user/worker', workerRoute)
app.use('/api/user/category', categoryRoute)
app.use('/api/user/transportation', transportationRoute)




PORT = process.env.PORT

app.listen(PORT,()=>{
    logger.info(`Server is running on PORT ${PORT}`)
})