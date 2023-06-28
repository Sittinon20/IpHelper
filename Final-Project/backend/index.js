const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const UsersRoute = require("./Route/UsersRoute")


// DATABASE //
const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Start server in port ${port}`))

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
}).then(() => console.log("เชื่อมต่อสำเร็จ"))
.catch((err) => console.log(err))

// MIDDLEWARE //
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// ROUTE //
app.use("/api", UsersRoute)