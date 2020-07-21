const mongoose = require("mongoose");

const url =
    "mongodb+srv://phantom:B48uiwZigvYI3beQ@cluster0-efltl.mongodb.net/test?retryWrites=true&w=majority";
//   "mongodb://localhost/myapp";
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Succesfull connected");
    })
    .catch((error) => {
        console.log("Unable to connect");
        console.error(error);
    });