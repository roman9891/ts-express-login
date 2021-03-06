import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express, { Request, Response } from "express";
import { router } from "./routes/loginRouter";

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({ keys: ['sadsdas'] }))
app.use(router)

app.listen(3000, () => {
    console.log('listening on port 3000')
})