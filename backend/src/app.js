import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import globalErrorHandler from './middleware/error.middleware.js'


const app = express()


app.use(cors({
    origin : process.env.CORS,
    credentials : true,
    methods : [ "GET", "POST", "PUT", "DELETE" ]
}))



app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({ extended : true, limit : "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// import routers
import { authLimiter, globalLimiter } from './middleware/rateLimiter.middleware.js'
import authRouter from './routes/auth.router.js'



// routers
app.use("/api", globalLimiter)
app.use("/api/vidyalaya/v1/auth", authLimiter, authRouter)



// last router where error handling
app.use(globalErrorHandler);


export default app;
