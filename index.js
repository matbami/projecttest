require("./db/mongoose.js");
const express = require('express')

const app = express();


const userRouter = require('./controllers/user.js')
const podcastRouter = require('./controllers/podcast.js')

const port = process.env.PORT || 3000;

app.use(express.json());


app.use(userRouter);
app.use(podcastRouter)

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});