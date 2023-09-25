const express = require("express")
const adminRouter = require('./routes/admin.routes/auth.route')
const workerRouter = require('./routes/admin.routes/worker.route')
const categoryRouter = require('./routes/admin.routes/category.route')
const serviceRouter = require('./routes/admin.routes/service.route')
const transportationRouter = require('./routes/admin.routes/transportation.route')
const feedbackRouter = require('./routes/admin.routes/feedback.route')
const customerRouter = require("./routes/admin.routes/customer.route")

const userRouter = require('./routes/user.routes/auth.route')
const feedbackRoute = require('./routes/user.routes/feedback.route')

require('./db.js').connectToMongoDB()
require("./authentication/auth.js")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/admin', adminRouter)
app.use('/api/admin/worker', workerRouter)
app.use('/api/admin/category', categoryRouter)
app.use('/api/admin/service', serviceRouter)
app.use('/api/admin/transportation', transportationRouter)
app.use('/api/admin/feedback', feedbackRouter)
app.use('/api/admin/customer', customerRouter)


app.use('/api/user', userRouter)
app.use('/api/user/feedback', feedbackRoute)



PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})