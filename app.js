const express = require("express")
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

require('./db.js').connectToMongoDB()
require("./authentication/auth.js")
require("dotenv").config()
const logger = require('./utils/logger/logger')

const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)
app.use(helmet());


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send("Welcome to Home Page")
    console.log("Welcome to Home Page")

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
    console.log(`Server is running on PORT ${PORT}`)
})